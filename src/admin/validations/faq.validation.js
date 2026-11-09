import { body } from 'express-validator';

const optionalFields = [
  body('sort_order').optional().isInt({ min: 0 }).withMessage('Sort order must be a non-negative integer').toInt(),
  body('status').optional().isBoolean().withMessage('Status must be a boolean').toBoolean(),
];

export const validationRequestPost = [
  body('category_id')
    .notEmpty().withMessage('Category is required')
    .isInt({ min: 1 }).withMessage('Category must be a valid id')
    .toInt(),
  body('question')
    .notEmpty().withMessage('Question is required')
    .isString().withMessage('Question must be a string')
    .trim()
    .isLength({ max: 255 }).withMessage('Question must be at most 255 characters'),
  body('answer')
    .notEmpty().withMessage('Answer is required')
    .isString().withMessage('Answer must be a string')
    .trim()
    .notEmpty().withMessage('Answer is required'),
  ...optionalFields,
];

// All fields optional so status / sort_order can be changed with a partial PUT.
export const validationRequestPut = [
  body('category_id')
    .optional()
    .isInt({ min: 1 }).withMessage('Category must be a valid id')
    .toInt(),
  body('question')
    .optional()
    .notEmpty().withMessage('Question cannot be empty')
    .isString().withMessage('Question must be a string')
    .trim()
    .isLength({ max: 255 }).withMessage('Question must be at most 255 characters'),
  body('answer')
    .optional()
    .notEmpty().withMessage('Answer cannot be empty')
    .isString().withMessage('Answer must be a string')
    .trim()
    .notEmpty().withMessage('Answer cannot be empty'),
  ...optionalFields,
];
