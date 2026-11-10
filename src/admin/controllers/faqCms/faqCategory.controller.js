import { validationResult } from "express-validator";
import { Op } from "sequelize";
import ApiError from "../../../shared/utils/ApiError.js";
import sendValidationError from "../../../shared/utils/sendValidationError.js";
import paginate from "../../../shared/utils/paginate.js";
import slugify from "../../../shared/utils/slugify.js";
import { validateId } from "../../validations/common.validation.js";
import {
  validationRequestPost,
  validationRequestPut,
} from "../../validations/faqCms/faqCategory.validation.js";
import { models } from "../../../shared/models/index.js";

const { FaqCategory, Faq } = models;

export default class FaqCategoryController {
  static async getAll(req, res, next) {
    try {
      const { page, limit, search } = req.query;

      const { rows, pagination } = await paginate(FaqCategory, {
        page,
        limit,
        search,
        searchFields: ["title", "slug"],
        order: [
          ["sort_order", "ASC"],
          ["id", "ASC"],
        ],
      });

      res
        .status(200)
        .json({
          success: true,
          statusCode: 200,
          message: "Fetched successfully",
          data: rows,
          pagination: pagination,
        });
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
      if (!record) throw ApiError.notFound("FAQ category not found");

      res
        .status(200)
        .json({
          success: true,
          statusCode: 200,
          message: "Success",
          data: record,
        });
    } catch (error) {
      next(error);
    }
  }

  static async getActiveCategories(req, res, next) {
    try {
      const categories = await FaqCategory.findAll({
        where: { status: true },
        order: [
          ["sort_order", "ASC"],
          ["id", "ASC"],
        ],
      });

      res
        .status(200)
        .json({
          success: true,
          statusCode: 200,
          message: "Fetched active categories successfully",
          data: categories,
        });
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
      res
        .status(201)
        .json({
          success: true,
          statusCode: 201,
          message: "FAQ category created",
          data: record,
        });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      await Promise.all(
        [...validateId, ...validationRequestPut].map((v) => v.run(req)),
      );
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const record = await FaqCategory.findByPk(req.params.id);
      if (!record) throw ApiError.notFound("FAQ category not found");

      // do not

      await record.update(req.body);

      res
        .status(200)
        .json({
          success: true,
          statusCode: 200,
          message: "FAQ category updated",
          data: record,
        });
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
      if (!record) throw ApiError.notFound("FAQ category not found");

      const faqCount = await Faq.count({ where: { category_id: id } });
      if (faqCount > 0) {
        throw ApiError.badRequest(
          `Cannot delete a category that still has ${faqCount} FAQ(s). Delete or move them first.`,
        );
      }

      await record.destroy(); // soft delete
      res
        .status(200)
        .json({
          success: true,
          statusCode: 200,
          message: "FAQ category deleted",
          data: { id },
        });
    } catch (error) {
      next(error);
    }
  }
}
