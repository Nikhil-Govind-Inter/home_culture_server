import { validationResult } from 'express-validator';
import ApiError from '../../../shared/utils/ApiError.js';
import sendValidationError from '../../../shared/utils/sendValidationError.js';
import paginate from '../../../shared/utils/paginate.js';
import {
  handleFileUploadStore,
  handleFileUploadUpdate,
} from '../../../shared/utils/fileUpload.js';
import { cleanupUploads } from '../../../shared/utils/uploads.js';
import { validateId } from '../../validations/common.validation.js';
import {
  validationRequestPost,
  validationRequestPut,
} from '../../validations/aboutHighlight.validation.js';
import { models } from '../../../shared/models/index.js';

const { AboutHighlight } = models;

export const FOLDER = 'about-highlights';
export const MEDIA_FIELDS = ['icon_media_path'];

export default class AboutHighlightController {
  static async getAll(req, res, next) {
    try {
      const { page, limit, search } = req.query;

      const { rows, pagination } = await paginate(AboutHighlight, {
        page,
        limit,
        search,
        searchFields: ['title', 'description'],
        order: [
          ['sort_order', 'ASC'],
          ['id', 'ASC'],
        ],
      });

      res.status(200).json({ success: true, statusCode: 200, message: 'Fetched successfully', data: rows, pagination: pagination });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      await Promise.all(validateId.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const record = await AboutHighlight.findByPk(req.params.id);
      if (!record) throw ApiError.notFound('About highlight not found');

      res.status(200).json({ success: true, statusCode: 200, message: 'Success', data: record });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      await Promise.all(validationRequestPost.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        await cleanupUploads(req, MEDIA_FIELDS, FOLDER);
        return sendValidationError(res, errors);
      }

      if (!req.files?.icon_media_path?.[0]) {
        await cleanupUploads(req, MEDIA_FIELDS, FOLDER);
        throw ApiError.badRequest('icon_media_path (icon) is required');
      }

      // Media paths come from uploaded files only, never from body values.
      MEDIA_FIELDS.forEach((fields) => delete req.body[fields]);

      handleFileUploadStore(req, MEDIA_FIELDS);
      const record = await AboutHighlight.create(req.body);

      res.status(201).json({ success: true, statusCode: 201, message: 'About highlight created', data: record });
    } catch (error) {
      await cleanupUploads(req, MEDIA_FIELDS, FOLDER);
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      await Promise.all([...validateId, ...validationRequestPut].map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        await cleanupUploads(req, MEDIA_FIELDS, FOLDER);
        return sendValidationError(res, errors);
      }

      const record = await AboutHighlight.findByPk(req.params.id);
      if (!record) throw ApiError.notFound('About highlight not found');

      const { id: _id, ...data } = req.body;
      req.body = data;
      MEDIA_FIELDS.forEach((fields) => delete req.body[fields]);

      await handleFileUploadUpdate(req, record, MEDIA_FIELDS);
      await record.update(req.body);

      res.status(200).json({ success: true, statusCode: 200, message: 'About highlight updated', data: record });
    } catch (error) {
      await cleanupUploads(req, MEDIA_FIELDS, FOLDER);
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await Promise.all(validateId.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const { id } = req.params;
      const record = await AboutHighlight.findByPk(id);
      if (!record) throw ApiError.notFound('About highlight not found');

      await record.destroy(); // soft delete
      res.status(200).json({ success: true, statusCode: 200, message: 'About highlight deleted', data: { id } });
    } catch (error) {
      next(error);
    }
  }
}
