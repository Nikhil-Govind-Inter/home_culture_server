import { validationResult } from 'express-validator';
import ApiError from '../../shared/utils/ApiError.js';
import ApiResponse from '../../shared/utils/ApiResponse.js';
import sendValidationError from '../../shared/utils/sendValidationError.js';
import paginate from '../../shared/utils/paginate.js';
import slugify from '../../shared/utils/slugify.js';
import { idParam } from '../validations/common.validation.js';
import { validateFields } from '../validations/page.validation.js';
import { models } from '../../shared/models/index.js';

const { Page } = models;

export default class PageController {
  static async getAll(req, res, next) {
    try {
      const { page, limit, status } = req.query;
      const { rows, meta } = await paginate(Page, { page, limit, where: status ? { status } : {} });
      ApiResponse.success(res, rows, 'Fetched successfully', 200, meta);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      await Promise.all(idParam.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);
      const { id } = req.params;
      const record = await Page.findByPk(id);
      if (!record) throw ApiError.notFound('Page not found');
      ApiResponse.success(res, record);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      await Promise.all(validateFields.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);
      const data = { ...req.body };
      if (!data.slug) data.slug = slugify(data.title);
      const record = await Page.create(data);
      ApiResponse.created(res, record, 'Page created');
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      await Promise.all([...idParam, ...validateFields].map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);
      const { id } = req.params;
      const record = await Page.findByPk(id);
      if (!record) throw ApiError.notFound('Page not found');
      const changes = { ...req.body };
      if (!changes.slug && changes.title && changes.title !== record.title) {
        changes.slug = slugify(changes.title);
      }
      await record.update(changes);
      ApiResponse.success(res, record, 'Page updated');
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await Promise.all(idParam.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);
      const { id } = req.params;
      const record = await Page.findByPk(id);
      if (!record) throw ApiError.notFound('Page not found');
      await record.destroy(); // soft delete
      ApiResponse.success(res, { id }, 'Page deleted');
    } catch (error) {
      next(error);
    }
  }
}
