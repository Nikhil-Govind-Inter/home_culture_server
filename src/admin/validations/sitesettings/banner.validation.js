import { body } from 'express-validator';

export const validationRequestPost = [
  body('page').notEmpty().withMessage('Page is required').isString().withMessage('Page must be a string').trim(),
  body('page_slug').notEmpty().withMessage('Page slug is required').isString().withMessage('Page slug must be a string').trim(),
  body('header_title').notEmpty().withMessage('Header title is required').isString().withMessage('Header title must be a string').trim(),
  body('title').notEmpty().withMessage('Title is required').isString().withMessage('Title must be a string').trim(),
  body('description').notEmpty().withMessage('Description is required').isString().withMessage('Description must be a string').trim(),
  body('media_type').optional().isString().isIn(['image', 'video']).withMessage('Media type must be image or video'),
  body('banner_media_alt').notEmpty().withMessage('Banner media alt is required').isString().withMessage('Banner media alt must be a string').trim(),
  body('status').optional().isBoolean().withMessage('Status must be a boolean').toBoolean(),
];

export const validationRequestPut = [
  body('page').optional().notEmpty().withMessage('Page cannot be empty').isString().withMessage('Page must be a string').trim(),
  body('page_slug').optional().notEmpty().withMessage('Page slug cannot be empty').isString().withMessage('Page slug must be a string').trim(),
  body('header_title').optional().notEmpty().withMessage('Header title cannot be empty').isString().withMessage('Header title must be a string').trim(),
  body('title').optional().notEmpty().withMessage('Title cannot be empty').isString().withMessage('Title must be a string').trim(),
  body('description').optional().notEmpty().withMessage('Description cannot be empty').isString().withMessage('Description must be a string').trim(),
  body('media_type').optional().isString().isIn(['image', 'video']).withMessage('Media type must be image or video'),
  body('banner_media_alt').optional().notEmpty().withMessage('Banner media alt cannot be empty').isString().withMessage('Banner media alt must be a string').trim(),
  body('status').optional().isBoolean().withMessage('Status must be a boolean').toBoolean(),
];
