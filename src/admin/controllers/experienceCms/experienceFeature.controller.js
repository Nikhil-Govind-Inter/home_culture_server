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
} from "../../validations/experienceFeature.validation.js";
import { models } from "../../../shared/models/index.js";

const { ExperienceFeature } = models;

const FOLDER = "experience-features";
const MEDIA_FIELDS = ["media_path"];

export default class ExperienceFeatureController {
  static async getAll(req, res, next) {
    try {

      const { page, limit, search } = req.query;

      const { rows, pagination } = await paginate(ExperienceFeature, {
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

      const record = await ExperienceFeature.findByPk(req.params.id);
      if (!record) throw ApiError.notFound("Experience feature not found");

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


      // Media paths come from uploaded files only, never from body values.
      MEDIA_FIELDS.forEach((fields) => delete req.body[fields]);

      const missing = MEDIA_FIELDS.filter((field) => !req.files?.[field]?.[0]);
      if (missing.length) throw ApiError.badRequest(`Missing required files: ${missing.join(", ")}`);

      handleFileUploadStore(req, MEDIA_FIELDS);
      const record = await ExperienceFeature.create(req.body);

      res.status(201).json({ success: true, statusCode: 201, message: "Experience feature created", data: record });
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

      const record = await ExperienceFeature.findByPk(req.params.id);
      if (!record) throw ApiError.notFound("Experience feature not found");

      // Protected keys and media paths can't be set from plain body values;
      // media paths are filled in by handleFileUploadUpdate from uploaded files.
      MEDIA_FIELDS.forEach((fields) => delete req.body[fields]);

      await handleFileUploadUpdate(req, record, MEDIA_FIELDS);
      await record.update(req.body);

      res.status(200).json({ success: true, statusCode: 200, message: "Experience feature updated", data: record });
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
      const record = await ExperienceFeature.findByPk(id);
      if (!record) throw ApiError.notFound("Experience feature not found");

      await record.destroy(); // soft delete
      res.status(200).json({ success: true, statusCode: 200, message: "Experience feature deleted", data: { id } });
    } catch (error) {
      next(error);
    }
  }
}
