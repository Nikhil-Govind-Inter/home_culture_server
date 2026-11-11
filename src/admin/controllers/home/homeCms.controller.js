import { validationResult } from 'express-validator';
import ApiError from '../../../shared/utils/ApiError.js';
import sendValidationError from '../../../shared/utils/sendValidationError.js';
import { handleFileUploadStore, handleFileUploadUpdate } from '../../../shared/utils/fileUpload.js';
import { cleanupUploads } from '../../../shared/utils/uploads.js';
import { validationRequestPut } from '../../validations/home/homeCms.validation.js';
import { models } from '../../../shared/models/index.js';

const { HomeCms } = models;

// FILES
export const FOLDER = 'home-cms';
export const MEDIA_FIELDS = [
  'ownership_desktop_media_path',
  'ownership_mobile_media_path',
  'ownership_thumbnail',
  'journey_section_desktop_media_path',
  'journey_section_mobile_media_path',
  'journey_section_thumbnail',
  'cta_desktop_media_path',
  'cta_mobile_media_path',
];

// Home CMS is a single record: it can only be fetched and updated.
export default class HomeCmsController {

  // GET
  static async get(req, res, next) {
    try {
      const record = await HomeCms.findOne();
      if (!record) throw ApiError.notFound('Home CMS not found');
      res.status(200).json({ success: true, statusCode: 200, message: 'Success', data: record });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async update(req, res, next) {
    try {
      await Promise.all(validationRequestPut.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        await cleanupUploads(req, MEDIA_FIELDS, FOLDER);
        return sendValidationError(res, errors);
      }

      // Media paths come from uploaded files, never from plain body values.
      MEDIA_FIELDS.forEach((field) => delete req.body[field]);

      // Desktop media must match the media type (video/* vs image/*).
      const mismatched = [
        ['ownership_media_type', 'ownership_desktop_media_path'],
        ['journey_section_media_type', 'journey_section_desktop_media_path'],
      ].find(([type, field]) => {
        const file = req.files?.[field]?.[0];
        if (!file) return false;
        return !file.mimetype.startsWith(req.body[type] === 'video' ? 'video/' : 'image/');
      });
      if (mismatched) {
        const wantVideo = req.body[mismatched[0]] === 'video';
        throw ApiError.badRequest(
          wantVideo
            ? 'Desktop video must be a valid video file (mp4 or webm)'
            : 'Desktop image must be a valid image file (jpg, png, webp or gif)',
        );
      }

      const record = await HomeCms.findOne();

      if (!record) {
        // Thumbnails are only required when the matching media type is video.
        const required = MEDIA_FIELDS.filter((field) => {
          if (field === 'ownership_thumbnail') return req.body.ownership_media_type === 'video';
          if (field === 'journey_section_thumbnail') return req.body.journey_section_media_type === 'video';
          // Mobile media is only used for images.
          if (field === 'ownership_mobile_media_path') return req.body.ownership_media_type !== 'video';
          if (field === 'journey_section_mobile_media_path') return req.body.journey_section_media_type !== 'video';
          return true;
        });
        const missing = required.filter((field) => !req.files?.[field]?.[0]);
        if (missing.length) throw ApiError.badRequest(`Missing required files: ${missing.join(', ')}`);

        handleFileUploadStore(req, MEDIA_FIELDS);
        const created = await HomeCms.create(req.body);
        return res.status(201).json({ success: true, statusCode: 201, message: 'Home CMS created', data: created });
      }

      // Switching to video needs a thumbnail, uploaded now or already stored.
      const needsMobile = [
        ['ownership_media_type', 'ownership_mobile_media_path'],
        ['journey_section_media_type', 'journey_section_mobile_media_path'],
      ].filter(([type, mobile]) => req.body[type] === 'image' && !req.files?.[mobile]?.[0] && !record[mobile]);
      if (needsMobile.length) {
        throw ApiError.badRequest(`Missing required files: ${needsMobile.map(([, m]) => m).join(', ')}`);
      }

      const needsThumb = [
        ['ownership_media_type', 'ownership_thumbnail'],
        ['journey_section_media_type', 'journey_section_thumbnail'],
      ].filter(([type, thumb]) => req.body[type] === 'video' && !req.files?.[thumb]?.[0] && !record[thumb]);
      if (needsThumb.length) {
        throw ApiError.badRequest(`Missing required files: ${needsThumb.map(([, t]) => t).join(', ')}`);
      }

      await handleFileUploadUpdate(req, record, MEDIA_FIELDS);
      await record.update(req.body);
      res.status(200).json({ success: true, statusCode: 200, message: 'Home CMS updated', data: record });
    } catch (error) {
      await cleanupUploads(req, MEDIA_FIELDS, FOLDER);
      next(error);
    }
  }
}
