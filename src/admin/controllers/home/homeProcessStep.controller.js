import { validationResult } from "express-validator";
import ApiError from "../../../shared/utils/ApiError.js";
import sendValidationError from "../../../shared/utils/sendValidationError.js";
import paginate from "../../../shared/utils/paginate.js";
import { validateId } from "../../validations/common.validation.js";
import { validationRequestPost, validationRequestPut } from "../../validations/home/homeProcessStep.validation.js";
import { models } from "../../../shared/models/index.js";

const { HomeProcessStep } = models;

export default class HomeProcessStepController {
  static async getAll(req, res, next) {
    try {
      const { page, limit, search } = req.query;

      const { rows, pagination } = await paginate(HomeProcessStep, {
        page,
        limit,
        search,
        searchFields: ["title"],
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

      const record = await HomeProcessStep.findByPk(req.params.id);
      if (!record) throw ApiError.notFound("Process Step not found");

      res.status(200).json({ success: true, statusCode: 200, message: "Success", data: record });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      await Promise.all(validationRequestPost.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const record = await HomeProcessStep.create(req.body);

      res.status(201).json({ success: true, statusCode: 201, message: "Process Step created", data: record });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      await Promise.all([...validateId, ...validationRequestPut].map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const record = await HomeProcessStep.findByPk(req.params.id);
      if (!record) throw ApiError.notFound("Process Step not found");

      await record.update(req.body);

      res.status(200).json({ success: true, statusCode: 200, message: "Process Step updated", data: record });
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
      const record = await HomeProcessStep.findByPk(id);
      if (!record) throw ApiError.notFound("Process Step not found");

      await record.destroy(); // soft delete
      res.status(200).json({ success: true, statusCode: 200, message: "Process Step deleted", data: { id } });
    } catch (error) {
      next(error);
    }
  }
}
