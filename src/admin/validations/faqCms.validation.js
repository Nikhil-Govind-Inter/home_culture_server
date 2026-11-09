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

export const validationRequestPut = [
  // Section One
  sectionStatus('section_one_status', 'Section one'),
  requiredShort('section_one_media_alt', 'Section one media alt'),
  requiredShort('section_one_header_title', 'Section one header title'),
  requiredShort('section_one_title', 'Section one title'),
  required('section_one_description', 'Section one description'),

  // Sidebar
  sectionStatus('status', 'Sidebar'),
  requiredShort('sidebar_title', 'Sidebar title'),
  required('sidebar_quotes', 'Sidebar quotes'),

  // Section Two
  sectionStatus('section_two_status', 'Section two'),
  requiredShort('section_two_header_title', 'Section two header title'),
  requiredShort('section_two_title', 'Section two title'),
  required('section_two_description', 'Section two description'),
  requiredShort('section_two_button_text', 'Section two button text'),
  required('section_two_button_link', 'Section two button link'),
];
