import { validationResult } from 'express-validator';
import ApiError from '../../../shared/utils/ApiError.js';
import ApiResponse from '../../../shared/utils/ApiResponse.js';
import sendValidationError from '../../../shared/utils/sendValidationError.js';
import paginate from '../../../shared/utils/paginate.js';
import { validateId } from '../../validations/common.validation.js';
import {
  validationRequestPost,
  validationRequestPut,
} from '../../validations/faq.validation.js';
import { models } from '../../../shared/models/index.js';

const { Faq, FaqCategory } = models;

const categoryInclude = {
  model: FaqCategory,
  as: 'category',
  attributes: ['id', 'title'],
};

const assertCategoryExists = async (categoryId) => {
  const category = await FaqCategory.findByPk(categoryId);
  if (!category) throw ApiError.badRequest('FAQ category not found');
};

export default class FaqController {
  static async getAll(req, res, next) {
    try {
      const { page, limit, search, status, category_id: categoryId } = req.query;

      const where = {};
      if (status !== undefined) where.status = status === 'true';
      if (categoryId !== undefined && categoryId !== '') where.category_id = categoryId;

      const { rows, pagination } = await paginate(Faq, {
        page,
        limit,
        search,
        searchFields: ['question', 'answer', '$category.title$'],
        where,
        include: [categoryInclude],
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

      const record = await Faq.findByPk(req.params.id, { include: [categoryInclude] });
      if (!record) throw ApiError.notFound('FAQ not found');

      ApiResponse.success(res, record);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      await Promise.all(validationRequestPost.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const { id: _id, ...data } = req.body;
      await assertCategoryExists(data.category_id);
      const record = await Faq.create(data);

      ApiResponse.created(res, record, 'FAQ created');
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      await Promise.all([...validateId, ...validationRequestPut].map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const record = await Faq.findByPk(req.params.id);
      if (!record) throw ApiError.notFound('FAQ not found');

      const { id: _id, ...data } = req.body;
      if (data.category_id !== undefined) await assertCategoryExists(data.category_id);
      await record.update(data);

      ApiResponse.success(res, record, 'FAQ updated');
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
      const record = await Faq.findByPk(id);
      if (!record) throw ApiError.notFound('FAQ not found');

      await record.destroy(); // soft delete
      ApiResponse.success(res, { id }, 'FAQ deleted');
    } catch (error) {
      next(error);
    }
  }
}
