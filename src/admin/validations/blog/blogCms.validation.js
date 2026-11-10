import { body } from 'express-validator';

export const validationRequestPut = [
  // Detail page section
  body('detail_page_status')
    .optional()
    .isBoolean().withMessage('Detail page status must be a boolean')
    .toBoolean(),

  body('detail_page_header_title')
    .isString().withMessage('Detail page header title is required')
    .trim()
    .notEmpty().withMessage('Detail page header title is required')
    .isLength({ max: 255 }).withMessage('Detail page header title must be at most 255 characters'),

  body('detail_page_title')
    .isString().withMessage('Detail page title is required')
    .trim()
    .notEmpty().withMessage('Detail page title is required')
    .isLength({ max: 255 }).withMessage('Detail page title must be at most 255 characters'),

  body('detail_page_button_text')
    .isString().withMessage('Detail page button text is required')
    .trim()
    .notEmpty().withMessage('Detail page button text is required')
    .isLength({ max: 255 }).withMessage('Detail page button text must be at most 255 characters'),

  body('detail_page_button_link')
    .isString().withMessage('Detail page button link is required')
    .trim()
    .notEmpty().withMessage('Detail page button link is required')
    .isLength({ max: 255 }).withMessage('Detail page button link must be at most 255 characters'),

  // CTA section
  body('cta_status')
    .optional()
    .isBoolean().withMessage('CTA status must be a boolean')
    .toBoolean(),

  body('cta_media_alt')
    .isString().withMessage('CTA media alt is required')
    .trim()
    .notEmpty().withMessage('CTA media alt is required')
    .isLength({ max: 255 }).withMessage('CTA media alt must be at most 255 characters'),

  body('cta_header_title')
    .isString().withMessage('CTA header title is required')
    .trim()
    .notEmpty().withMessage('CTA header title is required')
    .isLength({ max: 255 }).withMessage('CTA header title must be at most 255 characters'),

  body('cta_title')
    .isString().withMessage('CTA title is required')
    .trim()
    .notEmpty().withMessage('CTA title is required')
    .isLength({ max: 255 }).withMessage('CTA title must be at most 255 characters'),

  body('cta_description')
    .isString().withMessage('CTA description is required')
    .trim()
    .notEmpty().withMessage('CTA description is required')
    .custom((value) => value.replace(/<[^>]*>/g, '').replace(/&nbsp;|\s/g, '').length > 0)
    .withMessage('CTA description is required'),

  body('cta_button_text')
    .isString().withMessage('CTA button text is required')
    .trim()
    .notEmpty().withMessage('CTA button text is required')
    .isLength({ max: 255 }).withMessage('CTA button text must be at most 255 characters'),

  body('cta_button_link')
    .isString().withMessage('CTA button link is required')
    .trim()
    .notEmpty().withMessage('CTA button link is required'),
];
