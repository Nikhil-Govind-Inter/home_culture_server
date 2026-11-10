import { validationResult } from "express-validator";
import ApiError from "../../../shared/utils/ApiError.js";
import sendValidationError from "../../../shared/utils/sendValidationError.js";
import paginate from "../../../shared/utils/paginate.js";
import { validateId } from "../../validations/common.validation.js";
import {
  validationRequestPost,
  validationRequestPut,
} from "../../validations/experienceFaq.validation.js";
import { models } from "../../../shared/models/index.js";

const { ExperienceFaq } = models;

export default class ExperienceFaqController {
  static async getAll(req, res, next) {
    try {

      const { page, limit, search } = req.query;

      const { rows, pagination } = await paginate(ExperienceFaq, {
        page,
        limit,
        search,
        searchFields: ["question", "answer"],
        order: [
          ["sort_order", "ASC"],
          ["id", "ASC"],
        ],
      });

      res.status(200).json({ success: true, statusCode: 200, message: "Fetched successfully", data: rows, pagination: pagination });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      await Promise.all(validateId.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const record = await ExperienceFaq.findByPk(req.params.id);
      if (!record) throw ApiError.notFound("Experience FAQ not found");

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
        return sendValidationError(res, errors);
      }

      const record = await ExperienceFaq.create(req.body);

      res.status(201).json({ success: true, statusCode: 201, message: "Experience FAQ created", data: record });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      await Promise.all([...validateId, ...validationRequestPut].map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return sendValidationError(res, errors);
      }

      const record = await ExperienceFaq.findByPk(req.params.id);
      if (!record) throw ApiError.notFound("Experience FAQ not found");

      await record.update(req.body);
      
      res.status(200).json({ success: true, statusCode: 200, message: "Experience FAQ updated", data: record });
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
      const record = await ExperienceFaq.findByPk(id);
      if (!record) throw ApiError.notFound("Experience FAQ not found");

      await record.destroy(); // soft delete
      res.status(200).json({ success: true, statusCode: 200, message: "Experience FAQ deleted", data: { id } });
    } catch (error) {
      next(error);
    }
  }
}
