import { validationResult } from "express-validator";
import ApiError from "../../../shared/utils/ApiError.js";
import sendValidationError from "../../../shared/utils/sendValidationError.js";
import paginate from "../../../shared/utils/paginate.js";
import { handleFileUploadStore, handleFileUploadUpdate } from "../../../shared/utils/fileUpload.js";
import { cleanupUploads } from "../../../shared/utils/uploads.js";
import { validateId } from "../../validations/common.validation.js";
import { validationRequestPost, validationRequestPut } from "../../validations/home/homeBanner.validation.js";
import { models } from "../../../shared/models/index.js";

const { HomeBanner } = models;

export const FOLDER = "home-banner";
export const MEDIA_FIELDS = ["desktop_media_path", "mobile_media_path", "thumbnail"];

// Files that must be uploaded for a given media type.
const requiredFiles = (type) => ["desktop_media_path", type === "video" ? "thumbnail" : "mobile_media_path"];

// Media must match the chosen type (video/* vs image/*); thumbnails and mobile images are always images.
const MATCH_FIELDS = ["desktop_media_path"];
const IMAGE_FIELDS = ["mobile_media_path", "thumbnail"];
const checkMediaTypes = (req, type) => {
  const wantVideo = type === "video";
  const bad = (field, prefix) => {
    const file = req.files?.[field]?.[0];
    return file && !file.mimetype.startsWith(prefix);
  };
  if (MATCH_FIELDS.some((field) => bad(field, wantVideo ? "video/" : "image/"))) {
    throw ApiError.badRequest(
      wantVideo
        ? "Media must be a valid video file (mp4 or webm)"
        : "Media must be a valid image file (jpg, png, webp or gif)",
    );
  }
  if (IMAGE_FIELDS.some((field) => bad(field, "image/"))) {
    throw ApiError.badRequest("Thumbnail and mobile media must be valid image files (jpg, png, webp or gif)");
  }
};

export default class HomeBannerController {
  static async getAll(req, res, next) {
    try {
      const { page, limit, search } = req.query;

      const { rows, pagination } = await paginate(HomeBanner, {
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

      const record = await HomeBanner.findByPk(req.params.id);
      if (!record) throw ApiError.notFound("Banner not found");

      res.status(200).json({ success: true, statusCode: 200, message: "Success", data: record });
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

      checkMediaTypes(req, req.body.media_type);

      const missing = requiredFiles(req.body.media_type).filter((field) => !req.files?.[field]?.[0]);
      if (missing.length) throw ApiError.badRequest(`Missing required files: ${missing.join(", ")}`);

      handleFileUploadStore(req, MEDIA_FIELDS);
      const record = await HomeBanner.create(req.body);

      res.status(201).json({ success: true, statusCode: 201, message: "Banner created", data: record });
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

      const record = await HomeBanner.findByPk(req.params.id);
      if (!record) throw ApiError.notFound("Banner not found");

      // Media paths can't be set from plain body values;
      // they are filled in by handleFileUploadUpdate from uploaded files.
      MEDIA_FIELDS.forEach((field) => delete req.body[field]);

      // Partial updates (status / sort order) send no media type: skip the media checks then.
      if (req.body.media_type !== undefined) {
        checkMediaTypes(req, req.body.media_type);

        const missing = requiredFiles(req.body.media_type).filter(
          (field) => !req.files?.[field]?.[0] && !record[field],
        );
        if (missing.length) throw ApiError.badRequest(`Missing required files: ${missing.join(", ")}`);
      }

      await handleFileUploadUpdate(req, record, MEDIA_FIELDS);
      await record.update(req.body);

      res.status(200).json({ success: true, statusCode: 200, message: "Banner updated", data: record });
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
      const record = await HomeBanner.findByPk(id);
      if (!record) throw ApiError.notFound("Banner not found");

      await record.destroy(); // soft delete
      res.status(200).json({ success: true, statusCode: 200, message: "Banner deleted", data: { id } });
    } catch (error) {
      next(error);
    }
  }
}
