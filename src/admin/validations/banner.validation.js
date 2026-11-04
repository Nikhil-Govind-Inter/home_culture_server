import { body, query } from 'express-validator';

const optionalText = (field) =>
  body(field).optional().isString().trim().notEmpty().withMessage(`${field} must be a non-empty string`);

export const validateFields = [
  optionalText('page'),
  optionalText('page_slug'),
  optionalText('header_title'),
  optionalText('title'),
  optionalText('description'),
  optionalText('banner_media_alt'),
  body('status').optional().isBoolean().withMessage('status must be a boolean').toBoolean(),
];

export const listQuery = [
  query('page').optional().isInt({ min: 1 }).withMessage('page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100'),
  query('search').optional().isString().trim().isLength({ max: 100 }).withMessage('search must be at most 100 characters'),
  query('status').optional().isBoolean().withMessage('status must be true or false'),
];
