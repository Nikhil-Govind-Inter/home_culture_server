import { validationResult } from 'express-validator';
import ApiError from '../../../shared/utils/ApiError.js';
import ApiResponse from '../../../shared/utils/ApiResponse.js';
import sendValidationError from '../../../shared/utils/sendValidationError.js';
import { handleFileUploadStore, handleFileUploadUpdate } from '../../../shared/utils/fileUpload.js';
import { cleanupUploads } from '../../../shared/utils/uploads.js';
import { validationRequestPut } from '../../validations/siteSetting.validation.js';
import { models } from '../../../shared/models/index.js';

const { SiteSettings } = models;

const MEDIA_FIELDS = ['header_logo', 'footer_logo'];
const FOLDER = 'site-settings';

// Site settings is a single record: it can only be fetched and updated.
export default class SiteSettingsController {
  static async get(req, res, next) {
    try {
      const record = await SiteSettings.findOne();
      ApiResponse.success(res, record);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      await Promise.all(validationRequestPut.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        await cleanupUploads(req, MEDIA_FIELDS, FOLDER);
        return sendValidationError(res, errors);
      }

      // Logo paths come from uploaded files, never from plain body values.
      const { id: _id, ...data } = req.body;
      req.body = data;
      MEDIA_FIELDS.forEach((f) => delete req.body[f]);

      const record = await SiteSettings.findOne();

      if (!record) {
        const missing = MEDIA_FIELDS.filter((f) => !req.files?.[f]?.[0]);
        if (missing.length) throw ApiError.badRequest(`Missing required files: ${missing.join(', ')}`);

        handleFileUploadStore(req, MEDIA_FIELDS);
        const created = await SiteSettings.create(req.body);
        return ApiResponse.created(res, created, 'Site settings created');
      }

      await handleFileUploadUpdate(req, record, MEDIA_FIELDS);
      await record.update(req.body);
      ApiResponse.success(res, record, 'Site settings updated');
    } catch (error) {
      await cleanupUploads(req, MEDIA_FIELDS, FOLDER);
      next(error);
    }
  }
}
