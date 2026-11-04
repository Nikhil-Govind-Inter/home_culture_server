import { validationResult } from "express-validator";
import ApiError from "../../shared/utils/ApiError.js";
import ApiResponse from "../../shared/utils/ApiResponse.js";
import sendValidationError from "../../shared/utils/sendValidationError.js";
import paginate from "../../shared/utils/paginate.js";
import uploadedPath from "../../shared/utils/uploadedPath.js";
import deleteUpload from "../../shared/utils/deleteUpload.js";
import { idParam } from "../validations/common.validation.js";
import { validateFields, listQuery } from "../validations/banner.validation.js";
import { models } from "../../shared/models/index.js";

const { Banner } = models;

const MEDIA_FIELDS = ["banner_desktop_media_path", "banner_mobile_media_path"];

const newUploads = (req) =>
  MEDIA_FIELDS.map((f) => uploadedPath(req, f, "banners")).filter(Boolean);

const cleanupUploads = async (req) => {
  await Promise.all(newUploads(req).map((p) => deleteUpload(p)));
};

export default class BannerController {
  static async getAll(req, res, next) {
    try {
      await Promise.all(listQuery.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);
     
      const { page, limit, search } = req.query;

      const { rows, meta } = await paginate(Banner, {
        page,
        limit,
        search,
        searchFields: ["page"],
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
    
    } 
    catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      await Promise.all([...idParam, ...validateFields].map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        await cleanupUploads(req);
        return sendValidationError(res, errors);
      }
     
      const { id } = req.params;
      const record = await Banner.findByPk(id);
     
      if (!record) throw ApiError.notFound("Banner not found");

      // Only whitelisted text fields; media paths come from uploaded files.
      const changes = {};
      for (const f of ["page", "page_slug", "header_title", "title", "description", "banner_media_alt", "status"]) {
        if (req.body[f] !== undefined) changes[f] = req.body[f];
      }
     
      const oldFiles = [];
      for (const f of MEDIA_FIELDS) {
        const path = uploadedPath(req, f, "banners");
        if (path) {
          if (record[f]) oldFiles.push(record[f]);
          changes[f] = path;
        }
      }

      await record.update(changes);
      await Promise.all(oldFiles.map((p) => deleteUpload(p)));
      ApiResponse.success(res, record, "Banner updated");
    } catch (error) {
      await cleanupUploads(req);
      next(error);
    }
  }
}
