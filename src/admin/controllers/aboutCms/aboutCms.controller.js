import { validationResult } from 'express-validator';
import ApiError from '../../../shared/utils/ApiError.js';
import ApiResponse from '../../../shared/utils/ApiResponse.js';
import sendValidationError from '../../../shared/utils/sendValidationError.js';
import { handleFileUploadStore, handleFileUploadUpdate } from '../../../shared/utils/fileUpload.js';
import { cleanupUploads } from '../../../shared/utils/uploads.js';
import { validationRequestPut } from '../../validations/aboutCms.validation.js';
import { models } from '../../../shared/models/index.js';

const { AboutCms } = models;

// FILES
export const FOLDER = 'about-cms';
export const MEDIA_FIELDS = [
  'story_section_media_path',
  'philosophy_section_media_path',
  'mission_icon',
  'vision_icon',
  'promise_section_left_media_path',
  'promise_section_right_media_path',
  'cta_section_desktop_media_path',
  'cta_section_mobile_media_path',
];

// About CMS is a single record: it can only be fetched and updated.
export default class AboutCmsController {

  // GET
  static async get(req, res, next) {
    try {
      const record = await AboutCms.findOne();
      ApiResponse.success(res, record);
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

      const record = await AboutCms.findOne();

      if (!record) {
        const missing = MEDIA_FIELDS.filter((fields) => !req.files?.[fields]?.[0]);
        if (missing.length) throw ApiError.badRequest(`Missing required files: ${missing.join(', ')}`);

        handleFileUploadStore(req, MEDIA_FIELDS);
        const created = await AboutCms.create(req.body);
        return ApiResponse.created(res, created, 'About CMS created');
      }

      await handleFileUploadUpdate(req, record, MEDIA_FIELDS);
      await record.update(req.body);
      ApiResponse.success(res, record, 'About CMS updated');
    } catch (error) {
      await cleanupUploads(req, MEDIA_FIELDS, FOLDER);
      next(error);
    }
  }
}
