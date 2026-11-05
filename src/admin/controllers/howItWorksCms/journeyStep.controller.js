import { validationResult } from "express-validator";
import ApiError from "../../../shared/utils/ApiError.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import sendValidationError from "../../../shared/utils/sendValidationError.js";
import paginate from "../../../shared/utils/paginate.js";
import { validateId } from "../../validations/common.validation.js";
import {
  validationRequestPost,
  validationRequestPut,
} from "../../validations/journeyStep.validation.js";
import { models } from "../../../shared/models/index.js";

const { JourneyStep } = models;

export default class JourneyStepController {
  static async getAll(req, res, next) {
    try {

      const { page, limit, search, status } = req.query;

      const { rows, pagination } = await paginate(JourneyStep, {
        page,
        limit,
        search,
        searchFields: ["title", "description"],
        where: status === undefined ? {} : { status: status === "true" },
        order: [
          ["sort_order", "ASC"],
          ["id", "ASC"],
        ],
      });

      ApiResponse.success(res, rows, "Fetched successfully", 200, pagination);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      await Promise.all(validateId.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const record = await JourneyStep.findByPk(req.params.id);
      if (!record) throw ApiError.notFound("Journey step not found");

      ApiResponse.success(res, record);
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

      const { id: _id, ...data } = req.body;
      req.body = data;

      const record = await JourneyStep.create(req.body);

      ApiResponse.created(res, record, "Journey step created");
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

      const record = await JourneyStep.findByPk(req.params.id);
      if (!record) throw ApiError.notFound("Journey step not found");

      await record.update(req.body);
      
      ApiResponse.success(res, record, "Journey step updated");
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
      const record = await JourneyStep.findByPk(id);
      if (!record) throw ApiError.notFound("Journey step not found");

      await record.destroy(); // soft delete
      ApiResponse.success(res, { id }, "Journey step deleted");
    } catch (error) {
      next(error);
    }
  }
}
