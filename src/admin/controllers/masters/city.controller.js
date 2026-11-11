import { validationResult } from "express-validator";
import ApiError from "../../../shared/utils/ApiError.js";
import sendValidationError from "../../../shared/utils/sendValidationError.js";
import paginate from "../../../shared/utils/paginate.js";
import slugify from "../../../shared/utils/slugify.js";
import { validateSlug } from "../../validations/common.validation.js";
import {
  validationRequestPost,
  validationRequestPut,
} from "../../validations/masters/city.validation.js";
import { models } from "../../../shared/models/index.js";

const { City, State, Job } = models;

const ORDER = [
  ["sort_order", "ASC"],
  ["id", "ASC"],
];
// The ids are internal; records are addressed by slug.
const ATTRIBUTES = { exclude: ["id", "state_id"] };

function buildInclude(stateSlug) {
  const include = { model: State, as: "state", attributes: ["name", "slug"] };
  if (stateSlug) {
    include.required = true;
    include.where = { slug: stateSlug };
  }
  return [include];
}

const findPublic = (slug) =>
  City.findOne({ where: { slug }, attributes: ATTRIBUTES, include: buildInclude() });

// Turns the `state` slug from the request into `state_id` on `data`.
async function applyState(data, stateSlug) {
  const state = await State.findOne({ where: { slug: stateSlug } });
  if (!state) throw ApiError.badRequest("State not found");
  data.state_id = state.id;
  delete data.state;
}

export default class CityController {
  static async getAll(req, res, next) {
    try {
      const { page, limit, search, state } = req.query;

      const where = {};

      const { rows, pagination } = await paginate(City, {
        page,
        limit,
        search,
        searchFields: ["name", "slug", "$state.name$"],
        where,
        include: buildInclude(state),
        attributes: ATTRIBUTES,
        order: ORDER,
      });

      res
        .status(200)
        .json({
          success: true,
          statusCode: 200,
          message: "Fetched successfully",
          data: rows,
          pagination,
        });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      await Promise.all(validateSlug.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const record = await findPublic(req.params.slug);
      if (!record) throw ApiError.notFound("City not found");

      res
        .status(200)
        .json({
          success: true,
          statusCode: 200,
          message: "Success",
          data: record,
        });
    } catch (error) {
      next(error);
    }
  }

  // Active records only (status = true), unpaginated, for dropdowns.
  static async getActive(req, res, next) {
    try {
      const { state } = req.query;

      // `state` is a state slug; filter through an inner join.
      const records = await City.findAll({
        where: { status: true },
        attributes: ATTRIBUTES,
        include: buildInclude(state),
        order: ORDER,
      });

      res
        .status(200)
        .json({
          success: true,
          statusCode: 200,
          message: "Fetched active records successfully",
          data: records,
        });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      await Promise.all(validationRequestPost.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const data = req.body;
      data.slug = slugify(data.slug);
      if (!data.slug) throw ApiError.badRequest("Slug is invalid");
      await applyState(data, data.state);

      const created = await City.create(data);
      const record = await findPublic(created.slug);
      res
        .status(201)
        .json({
          success: true,
          statusCode: 201,
          message: "City created",
          data: record,
        });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      await Promise.all(
        validateSlug.concat(validationRequestPut).map((v) => v.run(req)),
      );
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const record = await City.findOne({ where: { slug: req.params.slug } });
      if (!record) throw ApiError.notFound("City not found");

      const changes = req.body;
      if (changes.slug !== undefined) {
        changes.slug = slugify(changes.slug);
        if (!changes.slug) throw ApiError.badRequest("Slug is invalid");
      }
      if (changes.state !== undefined) {
        await applyState(changes, changes.state);
      }

      await record.update(changes);
      const updated = await findPublic(record.slug);
      res
        .status(200)
        .json({
          success: true,
          statusCode: 200,
          message: "City updated",
          data: updated,
        });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await Promise.all(validateSlug.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const { slug } = req.params;
      const record = await City.findOne({ where: { slug } });
      if (!record) throw ApiError.notFound("City not found");

      const count = await Job.count({ where: { city_id: record.id } });
      if (count > 0) {
        throw ApiError.badRequest(
          `Cannot delete a city that still has ${count} job(s). Delete or move them first.`,
        );
      }

      await record.destroy(); // soft delete
      res
        .status(200)
        .json({
          success: true,
          statusCode: 200,
          message: "City deleted",
          data: { slug },
        });
    } catch (error) {
      next(error);
    }
  }
}
