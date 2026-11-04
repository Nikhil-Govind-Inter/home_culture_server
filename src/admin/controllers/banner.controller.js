import { validationResult } from "express-validator";
import ApiError from "../../shared/utils/ApiError.js";
import ApiResponse from "../../shared/utils/ApiResponse.js";
import sendValidationError from "../../shared/utils/sendValidationError.js";
import paginate from "../../shared/utils/paginate.js";
import uploadedPath from "../../shared/utils/uploadedPath.js";
import deleteUpload from "../../shared/utils/deleteUpload.js";
import { idParam } from "../validations/common.validation.js";
import { validateFields } from "../validations/banner.validation.js";
import { models } from "../../shared/models/index.js";

const { Banner } = models;

export default class BannerController {
  static async getAll(req, res, next) {
    try {
      const { page, limit, status } = req.query;
      const { rows, meta } = await paginate(Banner, {
        page,
        limit,
        where: status ? { status } : {},
      });
      ApiResponse.success(res, rows, "Fetched successfully", 200, meta);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      await Promise.all(idParam.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);
      const { id } = req.params;
      const record = await Banner.findByPk(id);
      if (!record) throw ApiError.notFound("Banner not found");
      ApiResponse.success(res, record);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      await Promise.all(validateFields.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        await deleteUpload(uploadedPath(req, "image", "banners"));
        return sendValidationError(res, errors);
      }
      const data = { ...req.body };
      const image = uploadedPath(req, "image", "banners");
      if (image) data.image = image;
      const record = await Banner.create(data);
      ApiResponse.created(res, record, "Banner created");
    } catch (error) {
      await deleteUpload(uploadedPath(req, "image", "banners"));
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      await Promise.all([...idParam, ...validateFields].map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        await deleteUpload(uploadedPath(req, "image", "banners"));
        return sendValidationError(res, errors);
      }
      const { id } = req.params;
      const record = await Banner.findByPk(id);
      if (!record) throw ApiError.notFound("Banner not found");
      const oldImage = record.image;
      const changes = { ...req.body };
      const image = uploadedPath(req, "image", "banners");
      if (image) changes.image = image;
      await record.update(changes);
      if (image && oldImage) await deleteUpload(oldImage);
      ApiResponse.success(res, record, "Banner updated");
    } catch (error) {
      await deleteUpload(uploadedPath(req, "image", "banners"));
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await Promise.all(idParam.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);
      const { id } = req.params;
      const record = await Banner.findByPk(id);
      if (!record) throw ApiError.notFound("Banner not found");
      await record.destroy(); // soft delete
      ApiResponse.success(res, { id }, "Banner deleted");
    } catch (error) {
      next(error);
    }
  }
}
