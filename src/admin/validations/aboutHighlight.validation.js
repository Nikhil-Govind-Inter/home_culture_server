import { body } from 'express-validator';

const optionalFields = [
  body('description').optional().isString().withMessage('Description must be a string').trim(),
  body('sort_order').optional().isInt({ min: 0 }).withMessage('Sort order must be a non-negative integer').toInt(),
  body('status').optional().isBoolean().withMessage('Status must be a boolean').toBoolean(),
];

export const validationRequestPost = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be a string')
    .trim()
    .isLength({ max: 255 }).withMessage('Title must be at most 255 characters'),
  ...optionalFields,
];

export const validationRequestPut = [
  body('title')
    .optional()
    .notEmpty().withMessage('Title cannot be empty')
    .isString().withMessage('Title must be a string')
    .trim()
    .isLength({ max: 255 }).withMessage('Title must be at most 255 characters'),
  ...optionalFields,
];
