import { validationResult, matchedData } from "express-validator";
import ApiError from "../../../shared/utils/ApiError.js";
import sendValidationError from "../../../shared/utils/sendValidationError.js";
import paginate from "../../../shared/utils/paginate.js";import { validateId } from "../../validations/common.validation.js";
import {
  validationRequestPut,
} from "../../validations/sitesettings/metaData.validation.js";
import { models } from "../../../shared/models/index.js";

const { MetaData } = models;

export default class MetaDataController {
  static async getAll(req, res, next) {
    try {

      const { page, limit, search } = req.query;

      const { rows, pagination } = await paginate(MetaData, {
        page,
        limit,
        search,
        searchFields: ["page", "meta_title"],
        order: [["page", "ASC"]],
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

      const record = await MetaData.findByPk(req.params.id);
      if (!record) throw ApiError.notFound("MetaData not found");

      res.status(200).json({ success: true, statusCode: 200, message: 'Success', data: record });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      await Promise.all([...validateId, ...validationRequestPut].map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const record = await MetaData.findByPk(req.params.id);
      if (!record) throw ApiError.notFound("MetaData not found");

      await record.update(req.body);
      res.status(200).json({ success: true, statusCode: 200, message: "MetaData updated", data: record });
    } catch (error) {
      next(error);
    }
  }
}
