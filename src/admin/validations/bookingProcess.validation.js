import { body } from 'express-validator';

const common = [
  body('sort_order').optional().isInt({ min: 1 }).withMessage('Sort order must be a positive integer').toInt(),
  body('status').optional().isBoolean().withMessage('Status must be a boolean').toBoolean(),
];

export const validationRequestPost = [
  body('title').notEmpty().withMessage('Title is required').isString().withMessage('Title must be a string').isLength({ max: 100 }).withMessage('Title must be at most 100 characters').trim(),
  body('description').notEmpty().withMessage('Description is required').isString().withMessage('Description must be a string').isLength({ max: 255 }).withMessage('Description must be at most 255 characters').trim(),
  ...common,
];

export const validationRequestPut = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty').isString().withMessage('Title must be a string').isLength({ max: 100 }).withMessage('Title must be at most 100 characters').trim(),
  body('description').optional().notEmpty().withMessage('Description cannot be empty').isString().withMessage('Description must be a string').isLength({ max: 255 }).withMessage('Description must be at most 255 characters').trim(),
  ...common,
];
