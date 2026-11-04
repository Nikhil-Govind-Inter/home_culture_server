import { body } from 'express-validator';

export const validateFields = [
  body('title').notEmpty().withMessage('title is required'),
  body('slug').optional().isString().withMessage('slug must be a string'),
  body('excerpt').optional().isString().withMessage('excerpt must be a string'),
  body('content').optional().isString().withMessage('content must be a string'),
  body('image').optional().isString().withMessage('image must be a string'),
  body('status').optional().isIn(['draft', 'published']).withMessage('status must be draft or published'),
];
