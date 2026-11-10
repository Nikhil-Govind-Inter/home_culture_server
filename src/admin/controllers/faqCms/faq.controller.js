import { validationResult } from "express-validator";
import ApiError from "../../../shared/utils/ApiError.js";
import sendValidationError from "../../../shared/utils/sendValidationError.js";
import paginate from "../../../shared/utils/paginate.js";
import { validateId } from "../../validations/common.validation.js";
import {
  validationRequestPost,
  validationRequestPut,
} from "../../validations/faqCms/faq.validation.js";
import { models } from "../../../shared/models/index.js";

const { Faq, FaqCategory } = models;

const categoryInclude = {
  model: FaqCategory,
  as: "category",
  attributes: ["id", "title"],
};

const assertCategoryExists = async (categoryId) => {
  const category = await FaqCategory.findByPk(categoryId);
  if (!category) throw ApiError.badRequest("FAQ category not found");
};

export default class FaqController {
  static async getAll(req, res, next) {
    try {
      const { page, limit, search, category_id: categoryId } = req.query;

      const where = {};
      if (categoryId !== undefined && categoryId !== "")
        where.category_id = categoryId;

      const { rows, pagination } = await paginate(Faq, {
        page,
        limit,
        search,
        searchFields: ["question", "answer", "$category.title$"],
        where,
        include: [categoryInclude],
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

      const record = await Faq.findByPk(req.params.id, {
        include: [categoryInclude],
      });
      if (!record) throw ApiError.notFound("FAQ not found");

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

  static async create(req, res, next) {
    try {
      await Promise.all(validationRequestPost.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      await assertCategoryExists(data.category_id);
      const record = await Faq.create(data);

      res
        .status(201)
        .json({
          success: true,
          statusCode: 201,
          message: "FAQ created",
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

      const record = await Faq.findByPk(req.params.id);
      if (!record) throw ApiError.notFound("FAQ not found");

      if (data.category_id !== undefined)
        await assertCategoryExists(data.category_id);
      await record.update(data);

      res
        .status(200)
        .json({
          success: true,
          statusCode: 200,
          message: "FAQ updated",
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
      const record = await Faq.findByPk(id);
      if (!record) throw ApiError.notFound("FAQ not found");

      await record.destroy(); // soft delete
      res
        .status(200)
        .json({
          success: true,
          statusCode: 200,
          message: "FAQ deleted",
          data: { id },
        });
    } catch (error) {
      next(error);
    }
  }
}
