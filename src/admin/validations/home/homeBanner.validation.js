import { body } from 'express-validator';

const common = [
  body('sort_order').optional().isInt({ min: 1 }).withMessage('Sort order must be a positive integer').toInt(),
  body('status').optional().isBoolean().withMessage('Status must be a boolean').toBoolean(),
];

export const validationRequestPost = [
  body('header_title').notEmpty().withMessage('Header Title is required').isString().withMessage('Header Title must be a string').isLength({ max: 255 }).withMessage('Header Title must be at most 255 characters').trim(),
  body('title').notEmpty().withMessage('Title is required').isString().withMessage('Title must be a string').isLength({ max: 255 }).withMessage('Title must be at most 255 characters').trim(),
  body('description').notEmpty().withMessage('Description is required').isString().withMessage('Description must be a string').trim(),
  body('media_type').isString().withMessage('Media type is required').isIn(['image', 'video']).withMessage('Media type must be image or video'),
  body('media_alt').notEmpty().withMessage('Media alt is required').isString().withMessage('Media alt must be a string').isLength({ max: 255 }).withMessage('Media alt must be at most 255 characters').trim(),
  body('button_one_text').optional({ values: 'falsy' }).isString().withMessage('Button One text must be a string').isLength({ max: 255 }).withMessage('Button One text must be at most 255 characters').trim(),
  body('button_one_link').optional({ values: 'falsy' }).isString().withMessage('Button One Link must be a string').isLength({ max: 255 }).withMessage('Button One Link must be at most 255 characters').trim(),
  body('button_two_text').optional({ values: 'falsy' }).isString().withMessage('Button Two text must be a string').isLength({ max: 255 }).withMessage('Button Two text must be at most 255 characters').trim(),
  body('button_two_link').optional({ values: 'falsy' }).isString().withMessage('Button Two Link must be a string').isLength({ max: 255 }).withMessage('Button Two Link must be at most 255 characters').trim(),
  ...common,
];

export const validationRequestPut = [
  body('header_title').optional().notEmpty().withMessage('Header Title cannot be empty').isString().withMessage('Header Title must be a string').isLength({ max: 255 }).withMessage('Header Title must be at most 255 characters').trim(),
  body('title').optional().notEmpty().withMessage('Title cannot be empty').isString().withMessage('Title must be a string').isLength({ max: 255 }).withMessage('Title must be at most 255 characters').trim(),
  body('description').optional().notEmpty().withMessage('Description cannot be empty').isString().withMessage('Description must be a string').trim(),
  body('media_type').optional().isString().isIn(['image', 'video']).withMessage('Media type must be image or video'),
  body('media_alt').optional().notEmpty().withMessage('Media alt cannot be empty').isString().withMessage('Media alt must be a string').isLength({ max: 255 }).withMessage('Media alt must be at most 255 characters').trim(),
  body('button_one_text').optional({ values: 'falsy' }).isString().withMessage('Button One text must be a string').isLength({ max: 255 }).withMessage('Button One text must be at most 255 characters').trim(),
  body('button_one_link').optional({ values: 'falsy' }).isString().withMessage('Button One Link must be a string').isLength({ max: 255 }).withMessage('Button One Link must be at most 255 characters').trim(),
  body('button_two_text').optional({ values: 'falsy' }).isString().withMessage('Button Two text must be a string').isLength({ max: 255 }).withMessage('Button Two text must be at most 255 characters').trim(),
  body('button_two_link').optional({ values: 'falsy' }).isString().withMessage('Button Two Link must be a string').isLength({ max: 255 }).withMessage('Button Two Link must be at most 255 characters').trim(),
  ...common,
];
