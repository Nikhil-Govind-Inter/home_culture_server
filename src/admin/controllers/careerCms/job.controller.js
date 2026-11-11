import { validationResult } from "express-validator";
import ApiError from "../../../shared/utils/ApiError.js";
import sendValidationError from "../../../shared/utils/sendValidationError.js";
import paginate from "../../../shared/utils/paginate.js";
import slugify from "../../../shared/utils/slugify.js";
import { validateSlug } from "../../validations/common.validation.js";
import {
  validationRequestPost,
  validationRequestPut,
} from "../../validations/careerCms/job.validation.js";
import { models } from "../../../shared/models/index.js";

const { Job, City, State, Department } = models;

const ORDER = [
  ["sort_order", "ASC"],
  ["id", "ASC"],
];

// Related rows are exposed as nested objects (name/slug), so the raw ids are left out.
const ATTRIBUTES = { exclude: ["id", "city_id", "department_id"] };

// A slug filter turns the join into an inner join on that slug.
function buildInclude({ state, city, department } = {}) {
  const cityInclude = {
    model: City,
    as: "city",
    attributes: ["name", "slug"],
    include: [{ model: State, as: "state", attributes: ["name", "slug"] }],
  };
  const stateInclude = cityInclude.include[0];
  const departmentInclude = {
    model: Department,
    as: "department",
    attributes: ["name", "slug"],
  };

  if (city) {
    cityInclude.required = true;
    cityInclude.where = { slug: city };
  }
  if (state) {
    // The city row is needed too, so its join stays inner.
    cityInclude.required = true;
    stateInclude.required = true;
    stateInclude.where = { slug: state };
  }
  if (department) {
    departmentInclude.required = true;
    departmentInclude.where = { slug: department };
  }

  return [cityInclude, departmentInclude];
}

const INCLUDE = buildInclude();

const findPublic = (slug) =>
  Job.findOne({ where: { slug }, attributes: ATTRIBUTES, include: INCLUDE });

// Turns the `city` / `department` slugs from the request into ids on `data`.
async function applySlugs(data, { city, department }) {
  if (city !== undefined) {
    const record = await City.findOne({ where: { slug: city } });
    if (!record) throw ApiError.badRequest("City not found");
    data.city_id = record.id;
    delete data.city;
  }
  if (department !== undefined) {
    const record = await Department.findOne({ where: { slug: department } });
    if (!record) throw ApiError.badRequest("Department not found");
    data.department_id = record.id;
    delete data.department;
  }
}

export default class JobController {
  static async getAll(req, res, next) {
    try {
      const { page, limit, search, state, city, department } = req.query;

      const { rows, pagination } = await paginate(Job, {
        page,
        limit,
        search,
        searchFields: ["position", "slug"],
        include: buildInclude({ state, city, department }),
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
      if (!record) throw ApiError.notFound("Job not found");

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
      const records = await Job.findAll({
        where: { status: true },
        attributes: ATTRIBUTES,
        include: INCLUDE,
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
      const { city, department } = data;
      data.slug = slugify(data.slug);
      if (!data.slug) throw ApiError.badRequest("Slug is invalid");

      await applySlugs(data, { city, department });

      const created = await Job.create(data);
      const record = await findPublic(created.slug);
      res
        .status(201)
        .json({
          success: true,
          statusCode: 201,
          message: "Job created",
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

      const record = await Job.findOne({ where: { slug: req.params.slug } });
      if (!record) throw ApiError.notFound("Job not found");

      const changes = req.body;
      const { city, department } = changes;
      if (changes.slug !== undefined) {
        changes.slug = slugify(changes.slug);
        if (!changes.slug) throw ApiError.badRequest("Slug is invalid");
      }
      await applySlugs(changes, { city, department });

      await record.update(changes);
      const updated = await findPublic(record.slug);
      res
        .status(200)
        .json({
          success: true,
          statusCode: 200,
          message: "Job updated",
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
      const record = await Job.findOne({ where: { slug } });
      if (!record) throw ApiError.notFound("Job not found");

      await record.destroy(); // soft delete
      res
        .status(200)
        .json({
          success: true,
          statusCode: 200,
          message: "Job deleted",
          data: { slug },
        });
    } catch (error) {
      next(error);
    }
  }
}
