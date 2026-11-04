import { body } from 'express-validator';

export const validateFields = [
  body('title').notEmpty().withMessage('title is required'),
  body('title_ar').notEmpty().withMessage('title_ar is required'),
  body('description').notEmpty().withMessage('description is required'),
  body('description_ar').notEmpty().withMessage('description_ar is required'),
  body('form_title').notEmpty().withMessage('form_title is required'),
  body('form_title_ar').notEmpty().withMessage('form_title_ar is required'),
  body('social_media_title').notEmpty().withMessage('social_media_title is required'),
  body('social_media_title_ar').notEmpty().withMessage('social_media_title_ar is required'),
  body('map_url').notEmpty().withMessage('map_url is required'),
];
