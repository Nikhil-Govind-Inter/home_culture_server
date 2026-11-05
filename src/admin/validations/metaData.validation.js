import { body } from 'express-validator';

export const validationRequestPost = [
  body('page').notEmpty().withMessage('Page is required').isString().withMessage('Page must be a string').trim(),
  body('page_slug').notEmpty().withMessage('Page slug is required').isString().withMessage('Page slug must be a string').trim(),
  body('meta_title').notEmpty().withMessage('Meta title is required').isString().withMessage('Meta title must be a string').trim(),
  body('meta_description').notEmpty().withMessage('Meta description is required').isString().withMessage('Meta description must be a string').trim(),
  body('meta_keywords').notEmpty().withMessage('Meta keywords is required').isString().withMessage('Meta keywords must be a string').trim(),
];

export const validationRequestPut = [
  body('page').optional().notEmpty().withMessage('Page cannot be empty').isString().withMessage('Page must be a string').trim(),
  body('page_slug').optional().notEmpty().withMessage('Page slug cannot be empty').isString().withMessage('Page slug must be a string').trim(),
  body('meta_title').optional().notEmpty().withMessage('Meta title cannot be empty').isString().withMessage('Meta title must be a string').trim(),
  body('meta_description').optional().notEmpty().withMessage('Meta description cannot be empty').isString().withMessage('Meta description must be a string').trim(),
  body('meta_keywords').optional().notEmpty().withMessage('Meta keywords cannot be empty').isString().withMessage('Meta keywords must be a string').trim(),
];
