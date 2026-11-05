import { body } from 'express-validator';

const common = [
  body('sort_order').optional().isInt({ min: 1 }).withMessage('Sort order must be a positive integer').toInt(),
  body('status').optional().isBoolean().withMessage('Status must be a boolean').toBoolean(),
];

export const validationRequestPost = [
  body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string').isLength({ max: 255 }).withMessage('Name must be at most 255 characters').trim(),
  body('designation').optional({ values: 'falsy' }).isString().withMessage('Designation must be a string').isLength({ max: 255 }).withMessage('Designation must be at most 255 characters').trim(),
  body('quotes').notEmpty().withMessage('Quotes is required').isString().withMessage('Quotes must be a string').trim(),
  ...common,
];

export const validationRequestPut = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty').isString().withMessage('Name must be a string').isLength({ max: 255 }).withMessage('Name must be at most 255 characters').trim(),
  body('designation').optional({ values: 'falsy' }).isString().withMessage('Designation must be a string').isLength({ max: 255 }).withMessage('Designation must be at most 255 characters').trim(),
  body('quotes').optional().notEmpty().withMessage('Quotes cannot be empty').isString().withMessage('Quotes must be a string').trim(),
  ...common,
];
