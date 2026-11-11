import { body } from 'express-validator';

export const validationRequestPost = [
  body('city')
    .notEmpty().withMessage('City is required')
    .isString().withMessage('City must be a slug')
    .trim(),
  body('department')
    .notEmpty().withMessage('Department is required')
    .isString().withMessage('Department must be a slug')
    .trim(),
  body('position')
    .notEmpty().withMessage('Position is required')
    .isString().withMessage('Position must be a string')
    .trim()
    .isLength({ max: 255 }).withMessage('Position must be at most 255 characters'),
  body('slug')
    .notEmpty().withMessage('Slug is required')
    .isString().withMessage('Slug must be a string')
    .trim()
    .isLength({ max: 255 }).withMessage('Slug must be at most 255 characters'),
  body('posted_at')
    .optional({ values: 'falsy' })
    .isISO8601().withMessage('Posted at must be a valid date'),
  body('sort_order').optional().isInt({ min: 1 }).withMessage('Sort order must be a positive integer').toInt(),
  body('status').optional().isBoolean().withMessage('Status must be a boolean').toBoolean(),
];

export const validationRequestPut = [
  body('city')
    .optional()
    .notEmpty().withMessage('City cannot be empty')
    .isString().withMessage('City must be a slug')
    .trim(),
  body('department')
    .optional()
    .notEmpty().withMessage('Department cannot be empty')
    .isString().withMessage('Department must be a slug')
    .trim(),
  body('position')
    .optional()
    .notEmpty().withMessage('Position cannot be empty')
    .isString().withMessage('Position must be a string')
    .trim()
    .isLength({ max: 255 }).withMessage('Position must be at most 255 characters'),
  body('slug')
    .optional()
    .notEmpty().withMessage('Slug cannot be empty')
    .isString().withMessage('Slug must be a string')
    .trim()
    .isLength({ max: 255 }).withMessage('Slug must be at most 255 characters'),
  body('posted_at')
    .optional({ values: 'falsy' })
    .isISO8601().withMessage('Posted at must be a valid date'),
  body('sort_order').optional().isInt({ min: 1 }).withMessage('Sort order must be a positive integer').toInt(),
  body('status').optional().isBoolean().withMessage('Status must be a boolean').toBoolean(),
];
