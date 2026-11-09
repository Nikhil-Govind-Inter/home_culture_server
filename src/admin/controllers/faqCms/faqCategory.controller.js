import { validationResult } from 'express-validator';
import { Op } from 'sequelize';
import ApiError from '../../../shared/utils/ApiError.js';
import ApiResponse from '../../../shared/utils/ApiResponse.js';
import sendValidationError from '../../../shared/utils/sendValidationError.js';
import paginate from '../../../shared/utils/paginate.js';
import slugify from '../../../shared/utils/slugify.js';
import { validateId } from '../../validations/common.validation.js';
import {
  validationRequestPost,
  validationRequestPut,
} from '../../validations/faqCategory.validation.js';
import { models } from '../../../shared/models/index.js';

const { FaqCategory, Faq } = models;


export default class FaqCategoryController {
  static async getAll(req, res, next) {
    try {
      const { page, limit, search, status } = req.query;

      const { rows, pagination } = await paginate(FaqCategory, {
        page,
        limit,
        search,
        searchFields: ['title', 'slug'],
        where: status === undefined ? {} : { status: status === 'true' },
        order: [
          ['sort_order', 'ASC'],
          ['id', 'ASC'],
        ],
      });

      ApiResponse.success(res, rows, 'Fetched successfully', 200, pagination);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      await Promise.all(validateId.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const record = await FaqCategory.findByPk(req.params.id);
      if (!record) throw ApiError.notFound('FAQ category not found');

      ApiResponse.success(res, record);
    } catch (error) {
      next(error);
    }
  }

  static async getActiveCategories(req, res, next) {
    try {
      const categories = await FaqCategory.findAll({
        where: { status: true },
        order: [
          ['sort_order', 'ASC'],
          ['id', 'ASC'],
        ],
      });

      ApiResponse.success(res, categories, 'Fetched active categories successfully');
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      await Promise.all(validationRequestPost.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const record = await FaqCategory.create(req.body);
      ApiResponse.created(res, record, 'FAQ category created');
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      await Promise.all([...validateId, ...validationRequestPut].map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const record = await FaqCategory.findByPk(req.params.id);
      if (!record) throw ApiError.notFound('FAQ category not found');

      // do not 
      
      await record.update(req.body);

      ApiResponse.success(res, record, 'FAQ category updated');
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await Promise.all(validateId.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const { id } = req.params;
      const record = await FaqCategory.findByPk(id);
      if (!record) throw ApiError.notFound('FAQ category not found');

      const faqCount = await Faq.count({ where: { category_id: id } });
      if (faqCount > 0) {
        throw ApiError.badRequest(
          `Cannot delete a category that still has ${faqCount} FAQ(s). Delete or move them first.`,
        );
      }

      await record.destroy(); // soft delete
      ApiResponse.success(res, { id }, 'FAQ category deleted');
    } catch (error) {
      next(error);
    }
  }
}
