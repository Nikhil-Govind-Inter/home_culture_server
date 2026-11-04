import { body } from 'express-validator';

export const validateFields = [
  body('title').notEmpty().withMessage('title is required'),
  body('description').notEmpty().withMessage('description is required'),
  body('form_title').notEmpty().withMessage('form_title is required'),
  body('social_media_title').notEmpty().withMessage('social_media_title is required'),
  body('map_url').notEmpty().withMessage('map_url is required'),
];
