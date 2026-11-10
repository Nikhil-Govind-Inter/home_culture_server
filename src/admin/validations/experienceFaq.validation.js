import { body } from 'express-validator';

const common = [
  body('sort_order').optional().isInt({ min: 1 }).withMessage('Sort order must be a positive integer').toInt(),
  body('status').optional().isBoolean().withMessage('Status must be a boolean').toBoolean(),
];

export const validationRequestPost = [
  body('question').notEmpty().withMessage('Question is required').isString().withMessage('Question must be a string').isLength({ max: 100 }).withMessage('Question must be at most 100 characters').trim(),
  body('answer').notEmpty().withMessage('Answer is required').isString().withMessage('Answer must be a string').trim(),
  ...common,
];

export const validationRequestPut = [
  body('question').optional().notEmpty().withMessage('Question cannot be empty').isString().withMessage('Question must be a string').isLength({ max: 100 }).withMessage('Question must be at most 100 characters').trim(),
  body('answer').optional().notEmpty().withMessage('Answer cannot be empty').isString().withMessage('Answer must be a string').trim(),
  ...common,
];
