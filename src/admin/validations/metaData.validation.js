import { body, query } from 'express-validator';

const requiredText = (field) =>
  body(field).isString().withMessage(`${field} must be a string`).trim().notEmpty().withMessage(`${field} is required`);

export const validateFields = [
  requiredText('page'),
  requiredText('page_slug'),
  requiredText('meta_title'),
  requiredText('meta_description'),
  requiredText('meta_keywords'),
];

export const listQuery = [
  query('page').optional().isInt({ min: 1 }).withMessage('page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100'),
  query('search').optional().isString().trim().isLength({ max: 100 }).withMessage('search must be at most 100 characters'),
];
