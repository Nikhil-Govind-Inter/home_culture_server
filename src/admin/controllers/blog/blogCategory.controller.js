import { validationResult } from 'express-validator';
import ApiError from '../../../shared/utils/ApiError.js';
import sendValidationError from '../../../shared/utils/sendValidationError.js';
import paginate from '../../../shared/utils/paginate.js';
import slugify from '../../../shared/utils/slugify.js';
import { validateId } from '../../validations/common.validation.js';
import { validationRequestPost, validationRequestPut } from '../../validations/blog/blogCategory.validation.js';
import { models } from '../../../shared/models/index.js';

const { BlogCategory, Blog } = models;

const ORDER = [['sort_order', 'ASC'], ['id', 'ASC']];

export default class BlogCategoryController {
  static async getAll(req, res, next) {
    try {
      const { page, limit, search } = req.query;

      const { rows, pagination } = await paginate(BlogCategory, {
        page,
        limit,
        search,
        searchFields: ['title', 'slug'],
        order: ORDER,
      });

      res.status(200).json({ success: true, statusCode: 200, message: 'Fetched successfully', data: rows, pagination });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      await Promise.all(validateId.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const record = await BlogCategory.findByPk(req.params.id);
      if (!record) throw ApiError.notFound('Blog category not found');

      res.status(200).json({ success: true, statusCode: 200, message: 'Success', data: record });
    } catch (error) {
      next(error);
    }
  }

  // Active categories only (status = true), unpaginated, for dropdowns.
  static async getActiveCategories(req, res, next) {
    try {
      const categories = await BlogCategory.findAll({ where: { status: true }, order: ORDER });

      res.status(200).json({ success: true, statusCode: 200, message: 'Fetched active categories successfully', data: categories });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      await Promise.all(validationRequestPost.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const data = { ...req.body };
      data.slug = slugify(data.slug || data.title);
      if (!data.slug) throw ApiError.badRequest('Slug could not be generated, please provide one');

      const record = await BlogCategory.create(data);
      res.status(201).json({ success: true, statusCode: 201, message: 'Blog category created', data: record });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      await Promise.all([...validateId, ...validationRequestPut].map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const record = await BlogCategory.findByPk(req.params.id);
      if (!record) throw ApiError.notFound('Blog category not found');

      const changes = { ...req.body };
      if (changes.slug !== undefined) {
        changes.slug = slugify(changes.slug);
        if (!changes.slug) throw ApiError.badRequest('Slug is invalid');
      }

      await record.update(changes);
      res.status(200).json({ success: true, statusCode: 200, message: 'Blog category updated', data: record });
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
      const record = await BlogCategory.findByPk(id);
      if (!record) throw ApiError.notFound('Blog category not found');

      const blogCount = await Blog.count({ where: { category_id: id } });
      if (blogCount > 0) {
        throw ApiError.badRequest(
          `Cannot delete a category that still has ${blogCount} blog(s). Delete or move them first.`,
        );
      }

      await record.destroy(); // soft delete
      res.status(200).json({ success: true, statusCode: 200, message: 'Blog category deleted', data: { id } });
    } catch (error) {
      next(error);
    }
  }
}
