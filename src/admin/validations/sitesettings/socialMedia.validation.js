import { body } from 'express-validator';

export const validationRequestPost = [
  body('media_alt').notEmpty().withMessage('Media alt is required').isString().withMessage('Media alt must be a string').trim(),
  body('link').notEmpty().withMessage('Link is required').isURL({ require_protocol: true }).withMessage('Link must be a valid URL (http:// or https://)'),
  body('sort_order').optional().isInt({ min: 1 }).withMessage('Sort order must be a positive integer').toInt(),
  body('status').optional().isBoolean().withMessage('Status must be a boolean').toBoolean(),
];

export const validationRequestPut = [
  body('media_alt').optional().notEmpty().withMessage('Media alt cannot be empty').isString().withMessage('Media alt must be a string').trim(),
  body('link').optional().isURL({ require_protocol: true }).withMessage('Link must be a valid URL (http:// or https://)'),
  body('sort_order').optional().isInt({ min: 1 }).withMessage('Sort order must be a positive integer').toInt(),
  body('status').optional().isBoolean().withMessage('Status must be a boolean').toBoolean(),
];
