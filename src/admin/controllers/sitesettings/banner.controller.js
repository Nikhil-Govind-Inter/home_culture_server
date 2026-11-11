import { validationResult } from "express-validator";
import ApiError from "../../../shared/utils/ApiError.js";
import sendValidationError from "../../../shared/utils/sendValidationError.js";
import paginate from "../../../shared/utils/paginate.js";
import { handleFileUploadUpdate } from "../../../shared/utils/fileUpload.js";
import { cleanupUploads } from "../../../shared/utils/uploads.js";
import { validateId } from "../../validations/common.validation.js";
import {
  validationRequestPut,
} from "../../validations/sitesettings/banner.validation.js";
import { models } from "../../../shared/models/index.js";

const { Banner } = models;

const MEDIA_FIELDS = ["banner_desktop_media_path", "banner_mobile_media_path", "banner_thumbnail_media_path"];

export default class BannerController {
  static async getAll(req, res, next) {
    try {

      const { page, limit, search } = req.query;

      const { rows, pagination } = await paginate(Banner, {
        page,
      limit,
        search,
        searchFields: ["page"],
        order: [['page', 'ASC']],
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

      const { id } = req.params;

      const record = await Banner.findByPk(id);

      if (!record) throw ApiError.notFound("Banner not found");

      res.status(200).json({ success: true, statusCode: 200, message: 'Success', data: record });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      await Promise.all([...validateId, ...validationRequestPut].map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        await cleanupUploads(req, MEDIA_FIELDS, "banners");
        return sendValidationError(res, errors);
      }

      const { id } = req.params;
      const record = await Banner.findByPk(id);

      if (!record) throw ApiError.notFound("Banner not found");

      const type = req.body.media_type || record.media_type;

      // multer accepts images and video on every field, so enforce the right kind per field.
      const isBad = (field, prefix) => {
        const file = req.files?.[field]?.[0];
        return file && !file.mimetype.startsWith(prefix);
      };
      if (isBad("banner_desktop_media_path", type === "video" ? "video/" : "image/")) {
        throw ApiError.badRequest(
          type === "video"
            ? "Media must be a valid video file (mp4 or webm)"
            : "Media must be a valid image file (jpg, png, webp or gif)",
        );
      }
      if (isBad("banner_mobile_media_path", "image/") || isBad("banner_thumbnail_media_path", "image/")) {
        throw ApiError.badRequest("Thumbnail and mobile media must be valid image files (jpg, png, webp or gif)");
      }

      const hasThumb = req.files?.banner_thumbnail_media_path?.length || record.banner_thumbnail_media_path;
      if (type === "video" && !hasThumb) {
        await cleanupUploads(req, MEDIA_FIELDS, "banners");
        throw ApiError.badRequest("Thumbnail is required for video banners");
      }

      // Protected keys and media paths can't be set from plain body values;
      // media paths are filled in by handleFileUploadUpdate from uploaded files.
      MEDIA_FIELDS.forEach((field) => delete req.body[field]);

      await handleFileUploadUpdate(req, record, MEDIA_FIELDS);
      await record.update(req.body);

      res.status(200).json({ success: true, statusCode: 200, message: "Banner updated", data: record });
    } catch (error) {
      await cleanupUploads(req, MEDIA_FIELDS, "banners");
      next(error);
    }
  }
}
