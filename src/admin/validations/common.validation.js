import { param } from 'express-validator';

export const validateId = [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
];

export const validateSlug = [
  param('slug').isString().trim().notEmpty().withMessage('Slug is required'),
];
