import { body } from 'express-validator';

export const validateFields = [
  body('title').notEmpty().withMessage('title is required'),
  body('subtitle').optional().isString().withMessage('subtitle must be a string'),
  body('image').optional().isString().withMessage('image must be a string'),
  body('link').optional().isString().withMessage('link must be a string'),
  body('sortOrder').optional().isInt().withMessage('sortOrder must be an integer').toInt(),
  body('status').optional().isIn(['draft', 'published']).withMessage('status must be draft or published'),
];
