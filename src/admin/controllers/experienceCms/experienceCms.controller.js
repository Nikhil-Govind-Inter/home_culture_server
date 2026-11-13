import { validationResult } from 'express-validator';
import ApiError from '../../../shared/utils/ApiError.js';
import sendValidationError from '../../../shared/utils/sendValidationError.js';
import { handleFileUploadStore, handleFileUploadUpdate } from '../../../shared/utils/fileUpload.js';
import { cleanupUploads } from '../../../shared/utils/uploads.js';
import { validationRequestPut } from '../../validations/experienceCms/experienceCms.validation.js';
import { models } from '../../../shared/models/index.js';

const { ExperienceCms } = models;

// FILES
export const FOLDER = 'experience-cms';
export const MEDIA_FIELDS = ['intro_section_media_path', 'visit_section_media_path', 'visit_section_thumbnail'];

// Experience CMS is a single record: it can only be fetched and updated.
export default class ExperienceCmsController {

  // GET
  static async get(req, res, next) {
    try {
      const record = await ExperienceCms.findOne();
      if (!record) throw ApiError.notFound('Experience CMS not found');
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
      MEDIA_FIELDS.forEach((fields) => delete req.body[fields]);

      const record = await ExperienceCms.findOne();
      const mediaType = req.body.visit_section_media_type || record?.visit_section_media_type || 'image';
      const isVideo = mediaType === 'video';

      // Visit media must match the media type (video/* vs image/*).
      const visitFile = req.files?.visit_section_media_path?.[0];
      if (visitFile && !visitFile.mimetype.startsWith(isVideo ? 'video/' : 'image/')) {
        throw ApiError.badRequest(
          isVideo
            ? 'Visit section media must be a valid video file (mp4 or webm)'
            : 'Visit section media must be a valid image file (jpg, png, webp or gif)',
        );
      }

      if (!record) {
        // The thumbnail is only required when the visit media is a video.
        const missing = MEDIA_FIELDS
          .filter((field) => field !== 'visit_section_thumbnail' || isVideo)
          .filter((field) => !req.files?.[field]?.[0]);
        if (missing.length) throw ApiError.badRequest(`Missing required files: ${missing.join(', ')}`);

        handleFileUploadStore(req, MEDIA_FIELDS);
        const created = await ExperienceCms.create(req.body);
        return res.status(201).json({ success: true, statusCode: 201, message: 'Experience CMS created', data: created });
      }

      // A video needs a thumbnail, uploaded now or already stored.
      if (isVideo && !req.files?.visit_section_thumbnail?.[0] && !record.visit_section_thumbnail) {
        throw ApiError.badRequest('Missing required files: visit_section_thumbnail');
      }

      await handleFileUploadUpdate(req, record, MEDIA_FIELDS);
      await record.update(req.body);
      res.status(200).json({ success: true, statusCode: 200, message: 'Experience CMS updated', data: record });
    } catch (error) {
      await cleanupUploads(req, MEDIA_FIELDS, FOLDER);
      next(error);
    }
  }
}
