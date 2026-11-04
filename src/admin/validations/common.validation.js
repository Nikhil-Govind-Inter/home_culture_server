import { param, query } from 'express-validator';

export const idParam = [
  param('id').isInt({ min: 1 }).withMessage('id must be a positive integer'),
];

export const pagination = [
  query('page').optional().isInt({ min: 1 }).withMessage('page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100'),
  query('status').optional().isIn(['draft', 'published']).withMessage('status must be draft or published'),
];
