import { body, query } from 'express-validator';

// Create requires media_alt and link; update makes every field optional.
const fields = (required) => {
  const field = (name) => (required ? body(name) : body(name).optional());

  return [
    field('media_alt').trim().notEmpty().withMessage('media_alt is required'),
    field('link').trim().isURL({ require_protocol: true }).withMessage('link must be a valid URL (http:// or https://)'),
    body('sort_order').optional().isInt({ min: 1 }).withMessage('sort_order must be a positive integer').toInt(),
    body('status').optional().isBoolean().withMessage('status must be true or false').toBoolean(),
  ];
};

export const createFields = fields(true);
export const updateFields = fields(false);

export const listQuery = [
  query('page').optional().isInt({ min: 1 }).withMessage('page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100'),
  query('search').optional().trim().isLength({ max: 100 }).withMessage('search must be at most 100 characters'),
  query('status').optional().isBoolean().withMessage('status must be true or false'),
];
