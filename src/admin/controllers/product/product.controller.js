import { validationResult } from 'express-validator';
import ApiError from '../../../shared/utils/ApiError.js';
import sendValidationError from '../../../shared/utils/sendValidationError.js';
import paginate from '../../../shared/utils/paginate.js';
import slugify from '../../../shared/utils/slugify.js';
import { handleFileUploadStore, handleFileUploadUpdate } from '../../../shared/utils/fileUpload.js';
import { cleanupUploads } from '../../../shared/utils/uploads.js';
import { validateId } from '../../validations/common.validation.js';
import { validationRequestPost, validationRequestPut } from '../../validations/product/product.validation.js';
import { models, sequelize } from '../../../shared/models/index.js';

const { Product, ProductStyle, ProductTrim, ProductSize, ProductAddOn } = models;

// FILES
export const FOLDER = 'products';
export const MEDIA_FIELDS = ['media_path'];

// Request field -> related model, association alias and setter on Product.
const RELATIONS = [
  { field: 'style_slugs', label: 'Style', Model: ProductStyle, as: 'styles', setter: 'setStyles', attributes: ['id', 'title', 'slug'] },
  { field: 'trim_slugs', label: 'Trim', Model: ProductTrim, as: 'trims', setter: 'setTrims', attributes: ['id', 'title', 'slug'] },
  { field: 'size_slugs', label: 'Size', Model: ProductSize, as: 'sizes', setter: 'setSizes', attributes: ['id', 'title', 'size', 'slug'] },
  { field: 'add_ons_slugs', label: 'Add-on', Model: ProductAddOn, as: 'add_ons', setter: 'setAdd_ons', attributes: ['id', 'title', 'subtitle', 'slug'] },
];

const buildInclude = () =>
  RELATIONS.map(({ Model, as, attributes }) => ({
    model: Model,
    as,
    attributes,
    through: { attributes: [] },
    required: false,
  }));

// Pulls the selected slug arrays out of the body (so they never reach Product.create/update),
// checks that every slug exists and resolves them to ids. Returns only the relations that were sent.
const extractSelections = async (body) => {
  const selections = [];
  for (const relation of RELATIONS) {
    const slugs = body[relation.field];
    delete body[relation.field];
    if (slugs === undefined) continue;

    let ids = [];
    if (slugs.length) {
      const rows = await relation.Model.findAll({ where: { slug: slugs }, attributes: ['id', 'slug'] });
      const known = new Set(rows.map((row) => row.slug));
      const missing = slugs.filter((slug) => !known.has(slug));
      if (missing.length) throw ApiError.badRequest(`${relation.label} not found: ${missing.join(', ')}`);
      ids = rows.map((row) => row.id);
    }
    selections.push({ ...relation, ids });
  }
  return selections;
};

const applySelections = (product, selections, transaction) =>
  Promise.all(selections.map(({ setter, ids }) => product[setter](ids, { transaction })));

export default class ProductController {
  static async getAll(req, res, next) {
    try {
      const { page, limit, search } = req.query;

      const { rows, pagination } = await paginate(Product, {
        page,
        limit,
        search,
        searchFields: ['title', 'header_title', 'slug'],
        include: buildInclude(),
        order: [
          ['sort_order', 'ASC'],
          ['id', 'ASC'],
        ],
      });

      res.status(200).json({ success: true, statusCode: 200, message: 'Fetched successfully', data: rows, pagination });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      await Promise.all(validateId.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const record = await Product.findByPk(req.params.id, { include: buildInclude() });
      if (!record) throw ApiError.notFound('Product not found');

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
      MEDIA_FIELDS.forEach((field) => delete req.body[field]);

      const missing = MEDIA_FIELDS.filter((field) => !req.files?.[field]?.[0]);
      if (missing.length) throw ApiError.badRequest(`Missing required files: ${missing.join(', ')}`);

      const selections = await extractSelections(req.body);

      handleFileUploadStore(req, MEDIA_FIELDS);
      const data = { ...req.body };
      data.slug = slugify(data.slug || data.title);
      if (!data.slug) throw ApiError.badRequest('Slug could not be generated, please provide one');

      const id = await sequelize.transaction(async (transaction) => {
        const product = await Product.create(data, { transaction });
        await applySelections(product, selections, transaction);
        return product.id;
      });

      const record = await Product.findByPk(id, { include: buildInclude() });
      res.status(201).json({ success: true, statusCode: 201, message: 'Product created', data: record });
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

      const record = await Product.findByPk(req.params.id);
      if (!record) throw ApiError.notFound('Product not found');

      // Media paths can't be set from plain body values;
      // handleFileUploadUpdate fills them in from uploaded files.
      MEDIA_FIELDS.forEach((field) => delete req.body[field]);

      const selections = await extractSelections(req.body);

      const changes = { ...req.body };
      if (changes.slug !== undefined) {
        changes.slug = slugify(changes.slug);
        if (!changes.slug) throw ApiError.badRequest('Slug is invalid');
      }

      await handleFileUploadUpdate(req, record, MEDIA_FIELDS);
      // handleFileUploadUpdate writes new media paths onto req.body.
      MEDIA_FIELDS.forEach((field) => {
        if (req.body[field]) changes[field] = req.body[field];
      });

      await sequelize.transaction(async (transaction) => {
        await record.update(changes, { transaction });
        await applySelections(record, selections, transaction);
      });

      const updated = await Product.findByPk(record.id, { include: buildInclude() });
      res.status(200).json({ success: true, statusCode: 200, message: 'Product updated', data: updated });
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
      const record = await Product.findByPk(id);
      if (!record) throw ApiError.notFound('Product not found');

      await record.destroy(); // soft delete
      res.status(200).json({ success: true, statusCode: 200, message: 'Product deleted', data: { id } });
    } catch (error) {
      next(error);
    }
  }
}
