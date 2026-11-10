import { validationResult } from 'express-validator';
import ApiError from '../../../shared/utils/ApiError.js';
import sendValidationError from '../../../shared/utils/sendValidationError.js';
import { handleFileUploadStore, handleFileUploadUpdate } from '../../../shared/utils/fileUpload.js';
import { cleanupUploads } from '../../../shared/utils/uploads.js';
import { validationRequestPut } from '../../validations/howItWorksCms.validation.js';
import { models } from '../../../shared/models/index.js';

const { HowItWorksCms } = models;

// FILES
export const FOLDER = 'how-it-works-cms';
export const MEDIA_FIELDS = [
  'vision_section_media_path',
  'workshop_section_media_path',
  'journey_section_media_path',
  'cta_desktop_media_path',
  'cta_mobile_media_path',
];

// How It Works CMS is a single record: it can only be fetched and updated.
export default class HowItWorksCmsController {

  // GET
  static async get(req, res, next) {
    try {
      const record = await HowItWorksCms.findOne();
      if (!record) throw ApiError.notFound('How It Works CMS not found');
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

      const record = await HowItWorksCms.findOne();

      if (!record) {
        const missing = MEDIA_FIELDS.filter((fields) => !req.files?.[fields]?.[0]);
        if (missing.length) throw ApiError.badRequest(`Missing required files: ${missing.join(', ')}`);

        handleFileUploadStore(req, MEDIA_FIELDS);
        const created = await HowItWorksCms.create(req.body);
        return res.status(201).json({ success: true, statusCode: 201, message: 'How It Works CMS created', data: created });
      }

      await handleFileUploadUpdate(req, record, MEDIA_FIELDS);
      await record.update(req.body);
      res.status(200).json({ success: true, statusCode: 200, message: 'How It Works CMS updated', data: record });
    } catch (error) {
      await cleanupUploads(req, MEDIA_FIELDS, FOLDER);
      next(error);
    }
  }
}
