import { validationResult } from 'express-validator';
import ApiError from '../../../shared/utils/ApiError.js';
import sendValidationError from '../../../shared/utils/sendValidationError.js';
import paginate from '../../../shared/utils/paginate.js';
import slugify from '../../../shared/utils/slugify.js';
import { validateSlug } from '../../validations/common.validation.js';
import { validationRequestPost, validationRequestPut } from '../../validations/masters/state.validation.js';
import { models } from '../../../shared/models/index.js';

const { State, City } = models;

const ORDER = [['sort_order', 'ASC'], ['id', 'ASC']];
// The id is internal; records are addressed by slug.
const ATTRIBUTES = { exclude: ['id'] };

const findPublic = (slug) => State.findOne({ where: { slug }, attributes: ATTRIBUTES });

export default class StateController {
  static async getAll(req, res, next) {
    try {
      const { page, limit, search } = req.query;

      const where = {};

      const { rows, pagination } = await paginate(State, {
        page,
        limit,
        search,
        searchFields: ['name', 'slug'],
        where,
        attributes: ATTRIBUTES,
        order: ORDER,
      });

      res.status(200).json({ success: true, statusCode: 200, message: 'Fetched successfully', data: rows, pagination });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      await Promise.all(validateSlug.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const record = await findPublic(req.params.slug);
      if (!record) throw ApiError.notFound('State not found');

      res.status(200).json({ success: true, statusCode: 200, message: 'Success', data: record });
    } catch (error) {
      next(error);
    }
  }

  // Active records only (status = true), unpaginated, for dropdowns.
  static async getActive(req, res, next) {
    try {
      const records = await State.findAll({ where: { status: true }, attributes: ATTRIBUTES, order: ORDER });

      res.status(200).json({ success: true, statusCode: 200, message: 'Fetched active records successfully', data: records });
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
      data.slug = slugify(data.slug);
      if (!data.slug) throw ApiError.badRequest('Slug is invalid');

      const created = await State.create(data);
      const record = await findPublic(created.slug);
      res.status(201).json({ success: true, statusCode: 201, message: 'State created', data: record });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      await Promise.all([...validateSlug, ...validationRequestPut].map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const record = await State.findOne({ where: { slug: req.params.slug } });
      if (!record) throw ApiError.notFound('State not found');

      const changes = { ...req.body };
      if (changes.slug !== undefined) {
        changes.slug = slugify(changes.slug);
        if (!changes.slug) throw ApiError.badRequest('Slug is invalid');
      }

      await record.update(changes);
      const updated = await findPublic(record.slug);
      res.status(200).json({ success: true, statusCode: 200, message: 'State updated', data: updated });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await Promise.all(validateSlug.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const { slug } = req.params;
      const record = await State.findOne({ where: { slug } });
      if (!record) throw ApiError.notFound('State not found');

      const count = await City.count({ where: { state_id: record.id } });
      if (count > 0) {
        throw ApiError.badRequest(
          `Cannot delete a state that still has ${count} city(s). Delete or move them first.`,
        );
      }

      await record.destroy(); // soft delete
      res.status(200).json({ success: true, statusCode: 200, message: 'State deleted', data: { slug } });
    } catch (error) {
      next(error);
    }
  }
}
