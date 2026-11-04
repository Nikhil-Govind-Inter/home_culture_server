import { validationResult, matchedData } from "express-validator";
import ApiError from "../../../shared/utils/ApiError.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import sendValidationError from "../../../shared/utils/sendValidationError.js";
import paginate from "../../../shared/utils/paginate.js";import { idParam } from "../../validations/common.validation.js";
import {
  validateFields,
  listQuery,
} from "../../validations/metaData.validation.js";
import { models } from "../../../shared/models/index.js";

const { MetaData } = models;

export default class MetaDataController {
  static async getAll(req, res, next) {
    try {
      await Promise.all(listQuery.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const { page, limit, search } = req.query;

      const { rows, meta } = await paginate(MetaData, {
        page,
        limit,
        search,
        searchFields: ["page", "meta_title"],
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

      const record = await MetaData.findByPk(req.params.id);
      if (!record) throw ApiError.notFound("MetaData not found");

      ApiResponse.success(res, record);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      await Promise.all([...idParam, ...validateFields].map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const record = await MetaData.findByPk(req.params.id);
      if (!record) throw ApiError.notFound("MetaData not found");

      // Only body fields covered by validateFields (so id/timestamps can't be overwritten).
      await record.update(matchedData(req, { locations: ["body"] }));
      ApiResponse.success(res, record, "MetaData updated");
    } catch (error) {
      next(error);
    }
  }
}
