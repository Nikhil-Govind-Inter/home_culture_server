import { body } from 'express-validator';

// Common validators shared by the fields below.
const statusField = (field, label) =>
  body(field)
    .optional()
    .isBoolean().withMessage(`${label} status must be a boolean`)
    .toBoolean();

const requiredString = (field, label, max = 255) =>
  body(field)
    .isString().withMessage(`${label} is required`)
    .trim()
    .notEmpty().withMessage(`${label} is required`)
    .isLength({ max }).withMessage(`${label} must be at most ${max} characters`);

// For TEXT columns: required, no length limit.
const requiredText = (field, label) =>
  body(field)
    .isString().withMessage(`${label} is required`)
    .trim()
    .notEmpty().withMessage(`${label} is required`);

// Rejects empty HTML such as <p></p>.
const requiredRichText = (field, label) =>
  requiredText(field, label)
    .custom((value) => value.replace(/<[^>]*>/g, '').replace(/&nbsp;|\s/g, '').length > 0)
    .withMessage(`${label} is required`);




    
export const validationRequestPut = [
  // Life at home section
  statusField('life_at_home_status', 'Life at home'),
  requiredString('life_at_home_header_title', 'Life at home header title'),
  requiredString('life_at_home_title', 'Life at home title'),
  requiredText('life_at_home_quote', 'Life at home quote'),
  requiredText('life_at_home_description', 'Life at home description'),
  requiredString('life_at_home_skills_title', 'Life at home skills title'),

  // Why join us section
  statusField('why_join_us_status', 'Why join us'),
  requiredString('why_join_us_header_title', 'Why join us header title', 100),
  requiredString('why_join_us_title', 'Why join us title', 100),
  requiredString('why_join_us_description', 'Why join us description'),

  // Media alts
  requiredString('media_one_alt', 'Media one alt'),
  requiredString('media_two_alt', 'Media two alt'),
  requiredString('media_three_alt', 'Media three alt'),
  requiredString('media_four_alt', 'Media four alt'),

  // Current opening section
  statusField('current_opening_status', 'Current opening'),
  requiredString('current_opening_header_title', 'Current opening header title', 100),
  requiredString('current_opening_title', 'Current opening title', 100),
  requiredString('current_opening_description', 'Current opening description'),

  // Testimonial section
  statusField('testimonial_status', 'Testimonial'),
  requiredString('testimonial_header_title', 'Testimonial header title', 100),
  requiredString('testimonial_title', 'Testimonial title', 100),
  requiredString('testimonial_description', 'Testimonial description'),

  // CTA section
  statusField('cta_status', 'CTA'),
  requiredString('cta_media_alt', 'CTA media alt'),
  requiredString('cta_header_title', 'CTA header title'),
  requiredString('cta_title', 'CTA title'),
  requiredRichText('cta_description', 'CTA description'),
  requiredString('cta_button_text', 'CTA button text'),
  requiredString('cta_button_link', 'CTA button link'),
];
