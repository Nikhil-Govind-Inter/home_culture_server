import { body } from 'express-validator';

const common = [
  // Optional: generated from the title when omitted on create.
  body('slug')
    .optional({ values: 'falsy' })
    .isString().withMessage('Slug must be a string')
    .trim()
    .isLength({ max: 255 }).withMessage('Slug must be at most 255 characters'),
  body('sort_order').optional().isInt({ min: 1 }).withMessage('Sort order must be a positive integer').toInt(),
  body('status').optional().isBoolean().withMessage('Status must be a boolean').toBoolean(),
];

export const validationRequestPost = [
  body('title').notEmpty().withMessage('Title is required').isString().withMessage('Title must be a string').isLength({ max: 255 }).withMessage('Title must be at most 255 characters').trim(),
  body('size').notEmpty().withMessage('Size is required').isInt({ min: 1 }).withMessage('Size must be a positive integer').toInt(),
  ...common,
];

export const validationRequestPut = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty').isString().withMessage('Title must be a string').isLength({ max: 255 }).withMessage('Title must be at most 255 characters').trim(),
  body('size').optional().notEmpty().withMessage('Size cannot be empty').isInt({ min: 1 }).withMessage('Size must be a positive integer').toInt(),
  ...common,
];
