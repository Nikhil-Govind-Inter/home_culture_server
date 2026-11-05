import { body } from 'express-validator';

const required = (field, label) =>
  body(field)
    .isString().withMessage(`${label} is required`)
    .trim()
    .notEmpty().withMessage(`${label} is required`);

const requiredShort = (field, label) =>
  required(field, label).isLength({ max: 255 }).withMessage(`${label} must be at most 255 characters`);

const sectionStatus = (field, label) =>
  body(field).optional().isBoolean().withMessage(`${label} status must be a boolean`).toBoolean();

export const validationRequestPost = [
  // Form Section
  sectionStatus('form_section_status', 'Form section'),
  requiredShort('form_section_title', 'Form section title'),
  required('form_section_description', 'Form section description'),

  required('google_map_link', 'Google map link'),

  // Form
  requiredShort('form_title', 'Form title'),
  required('form_description', 'Form description'),

  // FAQ Section
  sectionStatus('faq_section_status', 'FAQ section'),
  requiredShort('faq_section_title', 'FAQ section title'),
  required('faq_section_description', 'FAQ section description'),
  requiredShort('faq_section_button_text', 'FAQ section button text'),
  required('faq_section_button_link', 'FAQ section button link'),
];
