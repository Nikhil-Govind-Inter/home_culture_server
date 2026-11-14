import { validationResult } from "express-validator";
import ApiError from "../../../shared/utils/ApiError.js";
import sendValidationError from "../../../shared/utils/sendValidationError.js";
import paginate from "../../../shared/utils/paginate.js";
import slugify from "../../../shared/utils/slugify.js";
import {
  handleFileUploadStore,
  handleFileUploadUpdate,
} from "../../../shared/utils/fileUpload.js";
import { cleanupUploads } from "../../../shared/utils/uploads.js";
import { validateId } from "../../validations/common.validation.js";
import {
  validationRequestPost,
  validationRequestPut,
} from "../../validations/blog/blog.validation.js";
import { models } from "../../../shared/models/index.js";

const { Blog, BlogCategory } = models;

// FILES
export const FOLDER = "blogs";
export const MEDIA_FIELDS = ["media_path"];


const assertCategoryExists = async (categoryId) => {
  const category = await BlogCategory.findByPk(categoryId);
  if (!category) throw ApiError.badRequest("Blog category not found");
};

export default class BlogController {
  static async getAll(req, res, next) {
    try {
      const { page, limit, search, category_id: categoryId } = req.query;

      const where = {};
      if (categoryId !== undefined && categoryId !== "")
        where.category_id = categoryId;

      const { rows, pagination } = await paginate(Blog, {
        page,
        limit,
        search,
        searchFields: ["title", "excerpt", "$category.title$"],
        where,
        include: [
          {
            model: BlogCategory,
            as: "category",
            attributes: ["id", "title"],
          },
        ],
        order: [
          ["sort_order", "ASC"],
          ["id", "DESC"],
        ],
      });

      res
        .status(200)
        .json({
          success: true,
          statusCode: 200,
          message: "Fetched successfully",
          data: rows,
          pagination,
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

      const record = await Blog.findByPk(req.params.id, {
        include: [
          {
            model: BlogCategory,
            as: "category",
            attributes: ["id", "title"],
          },
        ],
      });
      if (!record) throw ApiError.notFound("Blog not found");

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
      if (!errors.isEmpty()) {
        await cleanupUploads(req, MEDIA_FIELDS, FOLDER);
        return sendValidationError(res, errors);
      }

      // Media paths come from uploaded files only, never from body values.
      MEDIA_FIELDS.forEach((field) => delete req.body[field]);

      const missing = MEDIA_FIELDS.filter((field) => !req.files?.[field]?.[0]);
      if (missing.length)
        throw ApiError.badRequest(
          `Missing required files: ${missing.join(", ")}`,
        );

      await assertCategoryExists(req.body.category_id);

      handleFileUploadStore(req, MEDIA_FIELDS);
      const data = { ...req.body };
      data.slug = slugify(data.slug || data.title);
      if (!data.slug)
        throw ApiError.badRequest(
          "Slug could not be generated, please provide one",
        );

      const record = await Blog.create(data);
      res
        .status(201)
        .json({
          success: true,
          statusCode: 201,
          message: "Blog created",
          data: record,
        });
    } catch (error) {
      await cleanupUploads(req, MEDIA_FIELDS, FOLDER);
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      await Promise.all(
        [...validateId, ...validationRequestPut].map((v) => v.run(req)),
      );
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        await cleanupUploads(req, MEDIA_FIELDS, FOLDER);
        return sendValidationError(res, errors);
      }

      const record = await Blog.findByPk(req.params.id);
      if (!record) throw ApiError.notFound("Blog not found");

      // Media paths can't be set from plain body values;
      // handleFileUploadUpdate fills them in from uploaded files.
      MEDIA_FIELDS.forEach((field) => delete req.body[field]);

      if (req.body.category_id !== undefined)
        await assertCategoryExists(req.body.category_id);

      const changes = { ...req.body };
      if (changes.slug !== undefined) {
        changes.slug = slugify(changes.slug);
        if (!changes.slug) throw ApiError.badRequest("Slug is invalid");
      }

      await handleFileUploadUpdate(req, record, MEDIA_FIELDS);
      // handleFileUploadUpdate writes new media paths onto req.body.
      MEDIA_FIELDS.forEach((field) => {
        if (req.body[field]) changes[field] = req.body[field];
      });

      await record.update(changes);
      res
        .status(200)
        .json({
          success: true,
          statusCode: 200,
          message: "Blog updated",
          data: record,
        });
    } catch (error) {
      await cleanupUploads(req, MEDIA_FIELDS, FOLDER);
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await Promise.all(validateId.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const { id } = req.params;
      const record = await Blog.findByPk(id);
      if (!record) throw ApiError.notFound("Blog not found");
      await record.destroy(); // soft delete
      res
        .status(200)
        .json({
          success: true,
          statusCode: 200,
          message: "Blog deleted",
          data: { id },
        });
    } catch (error) {
      next(error);
    }
  }
}
