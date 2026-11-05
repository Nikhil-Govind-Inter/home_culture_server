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
} from "../../validations/workshopMaterial.validation.js";
import { models } from "../../../shared/models/index.js";

const { WorkshopMaterial } = models;

const FOLDER = "workshop-materials";
const MEDIA_FIELDS = ["media_path"];

export default class WorkshopMaterialController {
  static async getAll(req, res, next) {
    try {

      const { page, limit, search, status } = req.query;

      const { rows, pagination } = await paginate(WorkshopMaterial, {
        page,
        limit,
        search,
        searchFields: ["title"],
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

      const record = await WorkshopMaterial.findByPk(req.params.id);
      if (!record) throw ApiError.notFound("Workshop material not found");

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

      if (!req.files?.media_path?.[0]) {
        await cleanupUploads(req, MEDIA_FIELDS, FOLDER);
        throw ApiError.badRequest("media_path (image) is required");
      }

      // Media paths come from uploaded files only, never from body values.
      const { id: _id, ...data } = req.body;
      req.body = data;
      MEDIA_FIELDS.forEach((fields) => delete req.body[fields]);

      handleFileUploadStore(req, MEDIA_FIELDS);
      const record = await WorkshopMaterial.create(req.body);

      ApiResponse.created(res, record, "Workshop material created");
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

      const record = await WorkshopMaterial.findByPk(req.params.id);
      if (!record) throw ApiError.notFound("Workshop material not found");

      // Protected keys and media paths can't be set from plain body values;
      // media paths are filled in by handleFileUploadUpdate from uploaded files.
      const { id: _id, ...data } = req.body;
      req.body = data;
      MEDIA_FIELDS.forEach((fields) => delete req.body[fields]);

      await handleFileUploadUpdate(req, record, MEDIA_FIELDS);
      await record.update(req.body);

      ApiResponse.success(res, record, "Workshop material updated");
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
      const record = await WorkshopMaterial.findByPk(id);
      if (!record) throw ApiError.notFound("Workshop material not found");

      await record.destroy(); // soft delete
      ApiResponse.success(res, { id }, "Workshop material deleted");
    } catch (error) {
      next(error);
    }
  }
}
