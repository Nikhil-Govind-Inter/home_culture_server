import { body } from 'express-validator';

export const validationRequestPost = [
  body('title').notEmpty().withMessage('Title is required').isString().withMessage('Title must be a string').trim(),
  body('slug').optional().isString().withMessage('Slug must be a string'),
  body('excerpt').optional().isString().withMessage('Excerpt must be a string'),
  body('content').optional().isString().withMessage('Content must be a string'),
  body('image').optional().isString().withMessage('Image must be a string'),
  body('status').optional().isIn(['draft', 'published']).withMessage('Status must be draft or published'),
];

export const validationRequestPut = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty').isString().withMessage('Title must be a string').trim(),
  body('slug').optional().isString().withMessage('Slug must be a string'),
  body('excerpt').optional().isString().withMessage('Excerpt must be a string'),
  body('content').optional().isString().withMessage('Content must be a string'),
  body('image').optional().isString().withMessage('Image must be a string'),
  body('status').optional().isIn(['draft', 'published']).withMessage('Status must be draft or published'),
];
