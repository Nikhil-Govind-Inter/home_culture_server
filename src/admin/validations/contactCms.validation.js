import { body } from 'express-validator';

export const validationRequestPost = [
  body('title').notEmpty().withMessage('Title is required').isString().withMessage('Title must be a string').trim(),
  body('description').notEmpty().withMessage('Description is required').isString().withMessage('Description must be a string').trim(),
  body('form_title').notEmpty().withMessage('Form title is required').isString().withMessage('Form title must be a string').trim(),
  body('social_media_title').notEmpty().withMessage('Social media title is required').isString().withMessage('Social media title must be a string').trim(),
  body('map_url').notEmpty().withMessage('Map URL is required').isString().withMessage('Map URL must be a string').trim(),
];
