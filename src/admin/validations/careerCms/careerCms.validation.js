import { body } from 'express-validator';

export const validationRequestPut = [
  // Life at home section
  body('life_at_home_status')
    .optional()
    .isBoolean().withMessage('Life at home status must be a boolean')
    .toBoolean(),

  body('life_at_home_header_title')
    .isString().withMessage('Life at home header title is required')
    .trim()
    .notEmpty().withMessage('Life at home header title is required')
    .isLength({ max: 255 }).withMessage('Life at home header title must be at most 255 characters'),

  body('life_at_home_title')
    .isString().withMessage('Life at home title is required')
    .trim()
    .notEmpty().withMessage('Life at home title is required')
    .isLength({ max: 255 }).withMessage('Life at home title must be at most 255 characters'),

  body('life_at_home_quote')
    .isString().withMessage('Life at home quote is required')
    .trim()
    .notEmpty().withMessage('Life at home quote is required')
    .isLength({ max: 255 }).withMessage('Life at home quote must be at most 255 characters'),

  body('life_at_home_description')
    .isString().withMessage('Life at home description is required')
    .trim()
    .notEmpty().withMessage('Life at home description is required')
    .isLength({ max: 255 }).withMessage('Life at home description must be at most 255 characters'),

  body('life_at_home_skills_title')
    .isString().withMessage('Life at home skills title is required')
    .trim()
    .notEmpty().withMessage('Life at home skills title is required')
    .isLength({ max: 255 }).withMessage('Life at home skills title must be at most 255 characters'),

  // Why join us section
  body('why_join_us_status')
    .optional()
    .isBoolean().withMessage('Why join us status must be a boolean')
    .toBoolean(),

  body('why_join_us_header_title')
    .isString().withMessage('Why join us header title is required')
    .trim()
    .notEmpty().withMessage('Why join us header title is required')
    .isLength({ max: 100 }).withMessage('Why join us header title must be at most 100 characters'),

  body('why_join_us_title')
    .isString().withMessage('Why join us title is required')
    .trim()
    .notEmpty().withMessage('Why join us title is required')
    .isLength({ max: 100 }).withMessage('Why join us title must be at most 100 characters'),

  body('why_join_us_description')
    .isString().withMessage('Why join us description is required')
    .trim()
    .notEmpty().withMessage('Why join us description is required')
    .isLength({ max: 255 }).withMessage('Why join us description must be at most 255 characters'),

  // Media alts
  body('media_one_alt')
    .isString().withMessage('Media one alt is required')
    .trim()
    .notEmpty().withMessage('Media one alt is required')
    .isLength({ max: 255 }).withMessage('Media one alt must be at most 255 characters'),

  body('media_two_alt')
    .isString().withMessage('Media two alt is required')
    .trim()
    .notEmpty().withMessage('Media two alt is required')
    .isLength({ max: 255 }).withMessage('Media two alt must be at most 255 characters'),

  body('media_three_alt')
    .isString().withMessage('Media three alt is required')
    .trim()
    .notEmpty().withMessage('Media three alt is required')
    .isLength({ max: 255 }).withMessage('Media three alt must be at most 255 characters'),

  body('media_four_alt')
    .isString().withMessage('Media four alt is required')
    .trim()
    .notEmpty().withMessage('Media four alt is required')
    .isLength({ max: 255 }).withMessage('Media four alt must be at most 255 characters'),

  // Current opening section
  body('current_opening_status')
    .optional()
    .isBoolean().withMessage('Current opening status must be a boolean')
    .toBoolean(),

  body('current_opening_header_title')
    .isString().withMessage('Current opening header title is required')
    .trim()
    .notEmpty().withMessage('Current opening header title is required')
    .isLength({ max: 100 }).withMessage('Current opening header title must be at most 100 characters'),

  body('current_opening_title')
    .isString().withMessage('Current opening title is required')
    .trim()
    .notEmpty().withMessage('Current opening title is required')
    .isLength({ max: 100 }).withMessage('Current opening title must be at most 100 characters'),

  body('current_opening_description')
    .isString().withMessage('Current opening description is required')
    .trim()
    .notEmpty().withMessage('Current opening description is required')
    .isLength({ max: 255 }).withMessage('Current opening description must be at most 255 characters'),

  // Testimonial section
  body('testimonial_status')
    .optional()
    .isBoolean().withMessage('Testimonial status must be a boolean')
    .toBoolean(),

  body('testimonial_header_title')
    .isString().withMessage('Testimonial header title is required')
    .trim()
    .notEmpty().withMessage('Testimonial header title is required')
    .isLength({ max: 100 }).withMessage('Testimonial header title must be at most 100 characters'),

  body('testimonial_title')
    .isString().withMessage('Testimonial title is required')
    .trim()
    .notEmpty().withMessage('Testimonial title is required')
    .isLength({ max: 100 }).withMessage('Testimonial title must be at most 100 characters'),

  body('testimonial_description')
    .isString().withMessage('Testimonial description is required')
    .trim()
    .notEmpty().withMessage('Testimonial description is required')
    .isLength({ max: 255 }).withMessage('Testimonial description must be at most 255 characters'),

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
    .notEmpty().withMessage('CTA button link is required')
    .isLength({ max: 255 }).withMessage('CTA button link must be at most 255 characters'),
];
