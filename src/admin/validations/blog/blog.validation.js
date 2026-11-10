import { body } from 'express-validator';

const hasContent = (value) =>
  /<(img|iframe|video)\b/i.test(value) || value.replace(/<[^>]*>/g, '').replace(/&nbsp;|\s/g, '').length > 0;

const common = [
  // Optional: generated from the title when omitted on create.
  body('slug')
    .optional({ values: 'falsy' })
    .isString().withMessage('Slug must be a string')
    .trim()
    .isLength({ max: 255 }).withMessage('Slug must be at most 255 characters'),
  body('sort_order').optional().isInt({ min: 1 }).withMessage('Sort order must be a positive integer').toInt(),
  body('status').optional().isBoolean().withMessage('Status must be a boolean').toBoolean(),
  body('is_featured').optional().isBoolean().withMessage('Is featured must be a boolean').toBoolean(),
  body('show_in_home').optional().isBoolean().withMessage('Show in home must be a boolean').toBoolean(),
];

export const validationRequestPost = [
  body('category_id')
    .notEmpty().withMessage('Category is required')
    .isInt({ min: 1 }).withMessage('Category must be a valid id')
    .toInt(),
  body('title')
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be a string')
    .trim()
    .isLength({ max: 255 }).withMessage('Title must be at most 255 characters'),
  body('excerpt')
    .notEmpty().withMessage('Excerpt is required')
    .isString().withMessage('Excerpt must be a string')
    .trim()
    .isLength({ max: 255 }).withMessage('Excerpt must be at most 255 characters'),
  body('description')
    .isString().withMessage('Description is required')
    .trim()
    .notEmpty().withMessage('Description is required')
    .custom(hasContent).withMessage('Description is required'),
  body('reading_time')
    .notEmpty().withMessage('Reading time is required')
    .isInt({ min: 1 }).withMessage('Reading time must be a positive number of minutes')
    .toInt(),
  body('thumbnail_media_alt')
    .notEmpty().withMessage('Thumbnail media alt is required')
    .isString().withMessage('Thumbnail media alt must be a string')
    .trim()
    .isLength({ max: 255 }).withMessage('Thumbnail media alt must be at most 255 characters'),
  body('media_alt')
    .notEmpty().withMessage('Media alt is required')
    .isString().withMessage('Media alt must be a string')
    .trim()
    .isLength({ max: 255 }).withMessage('Media alt must be at most 255 characters'),
  ...common,
];

export const validationRequestPut = [
  body('category_id')
    .optional()
    .isInt({ min: 1 }).withMessage('Category must be a valid id')
    .toInt(),
  body('title')
    .optional()
    .notEmpty().withMessage('Title cannot be empty')
    .isString().withMessage('Title must be a string')
    .trim()
    .isLength({ max: 255 }).withMessage('Title must be at most 255 characters'),
  body('excerpt')
    .optional()
    .notEmpty().withMessage('Excerpt cannot be empty')
    .isString().withMessage('Excerpt must be a string')
    .trim()
    .isLength({ max: 255 }).withMessage('Excerpt must be at most 255 characters'),
  body('description')
    .optional()
    .isString().withMessage('Description must be a string')
    .trim()
    .notEmpty().withMessage('Description cannot be empty')
    .custom(hasContent).withMessage('Description cannot be empty'),
  body('reading_time')
    .optional()
    .isInt({ min: 1 }).withMessage('Reading time must be a positive number of minutes')
    .toInt(),
  body('thumbnail_media_alt')
    .optional()
    .notEmpty().withMessage('Thumbnail media alt cannot be empty')
    .isString().withMessage('Thumbnail media alt must be a string')
    .trim()
    .isLength({ max: 255 }).withMessage('Thumbnail media alt must be at most 255 characters'),
  body('media_alt')
    .optional()
    .notEmpty().withMessage('Media alt cannot be empty')
    .isString().withMessage('Media alt must be a string')
    .trim()
    .isLength({ max: 255 }).withMessage('Media alt must be at most 255 characters'),
  ...common,
];
