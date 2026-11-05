import { validationResult } from "express-validator";
import ApiError from "../../../shared/utils/ApiError.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import sendValidationError from "../../../shared/utils/sendValidationError.js";
import paginate from "../../../shared/utils/paginate.js";
import {
  handleFileUploadStore,
  handleFileUploadUpdate,
} from "../../../shared/utils/fileUpload.js";
import { cleanupUploads } from "../../../shared/utils/uploads.js";
import { validateId } from "../../validations/common.validation.js";
import {
  validationRequestPost,
  validationRequestPut,
} from "../../validations/socialMedia.validation.js";
import { models } from "../../../shared/models/index.js";

const { SocialMedia } = models;

const FOLDER = "social-media";
const MEDIA_FIELDS = ["icon_media_path"];

export default class SocialMediaController {
  static async getAll(req, res, next) {
    try {

      const { page, limit, search, status } = req.query;

      const { rows, pagination } = await paginate(SocialMedia, {
        page,
        limit,
        search,
        searchFields: ["media_alt", "link"],
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

      const record = await SocialMedia.findByPk(req.params.id);
      if (!record) throw ApiError.notFound("Social media not found");

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
        await cleanupUploads(req, MEDIA_FIELDS, FOLDER);
        return sendValidationError(res, errors);
      }

      if (!req.files?.icon_media_path?.[0]) {
        await cleanupUploads(req, MEDIA_FIELDS, FOLDER);
        throw ApiError.badRequest("icon_media_path (icon) is required");
      }

      // Media paths come from uploaded files only, never from body values.
      const { id: _id, ...data } = req.body;
      req.body = data;
      MEDIA_FIELDS.forEach((fields) => delete req.body[fields]);

      handleFileUploadStore(req, MEDIA_FIELDS);
      const record = await SocialMedia.create(req.body);

      ApiResponse.created(res, record, "Social media created");
    } catch (error) {
      await cleanupUploads(req, MEDIA_FIELDS, FOLDER);
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      await Promise.all([...validateId, ...validationRequestPut].map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        await cleanupUploads(req, MEDIA_FIELDS, FOLDER);
        return sendValidationError(res, errors);
      }

      const record = await SocialMedia.findByPk(req.params.id);
      if (!record) throw ApiError.notFound("Social media not found");

      // Protected keys and media paths can't be set from plain body values;
      // media paths are filled in by handleFileUploadUpdate from uploaded files.
      const { id: _id, ...data } = req.body;
      req.body = data;
      MEDIA_FIELDS.forEach((fields) => delete req.body[fields]);

      await handleFileUploadUpdate(req, record, MEDIA_FIELDS);
      await record.update(req.body);

      ApiResponse.success(res, record, "Social media updated");
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
      const record = await SocialMedia.findByPk(id);
      if (!record) throw ApiError.notFound("Social media not found");

      await record.destroy(); // soft delete
      ApiResponse.success(res, { id }, "Social media deleted");
    } catch (error) {
      next(error);
    }
  }
}
