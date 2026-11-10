import { validationResult } from "express-validator";
import ApiError from "../../../shared/utils/ApiError.js";
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
} from "../../validations/sitesettings/socialMedia.validation.js";
import { models } from "../../../shared/models/index.js";

const { SocialMedia } = models;

const FOLDER = "social-media";
const MEDIA_FIELDS = ["icon_media_path"];

export default class SocialMediaController {
  static async getAll(req, res, next) {
    try {

      const { page, limit, search } = req.query;

      const { rows, pagination } = await paginate(SocialMedia, {
        page,
        limit,
        search,
        searchFields: ["media_alt", "link"],
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

      const record = await SocialMedia.findByPk(req.params.id);
      if (!record) throw ApiError.notFound("Social media not found");

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
        await cleanupUploads(req, MEDIA_FIELDS, FOLDER);
        return sendValidationError(res, errors);
      }

      if (!req.files?.icon_media_path?.[0]) {
        await cleanupUploads(req, MEDIA_FIELDS, FOLDER);
        throw ApiError.badRequest("icon_media_path (icon) is required");
      }

      // Media paths come from uploaded files only, never from body values.
      MEDIA_FIELDS.forEach((fields) => delete req.body[fields]);

      handleFileUploadStore(req, MEDIA_FIELDS);
      const record = await SocialMedia.create(req.body);

      res.status(201).json({ success: true, statusCode: 201, message: "Social media created", data: record });
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
      MEDIA_FIELDS.forEach((fields) => delete req.body[fields]);

      await handleFileUploadUpdate(req, record, MEDIA_FIELDS);
      await record.update(req.body);

      res.status(200).json({ success: true, statusCode: 200, message: "Social media updated", data: record });
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
      res.status(200).json({ success: true, statusCode: 200, message: "Social media deleted", data: { id } });
    } catch (error) {
      next(error);
    }
  }
}
