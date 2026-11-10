import { body } from 'express-validator';

const common = [
  body('sort_order').optional().isInt({ min: 1 }).withMessage('Sort order must be a positive integer').toInt(),
  body('status').optional().isBoolean().withMessage('Status must be a boolean').toBoolean(),
];

export const validationRequestPost = [
  body('location').notEmpty().withMessage('Location is required').isString().withMessage('Location must be a string').isLength({ max: 100 }).withMessage('Location must be at most 100 characters').trim(),
  body('location_link').notEmpty().withMessage('Location link is required').isString().withMessage('Location link must be a string').isLength({ max: 255 }).withMessage('Location link must be at most 255 characters').trim().isURL().withMessage('Location link must be a valid URL'),
  ...common,
];

export const validationRequestPut = [
  body('location').optional().notEmpty().withMessage('Location cannot be empty').isString().withMessage('Location must be a string').isLength({ max: 100 }).withMessage('Location must be at most 100 characters').trim(),
  body('location_link').optional().notEmpty().withMessage('Location link cannot be empty').isString().withMessage('Location link must be a string').isLength({ max: 255 }).withMessage('Location link must be at most 255 characters').trim().isURL().withMessage('Location link must be a valid URL'),
  ...common,
];
