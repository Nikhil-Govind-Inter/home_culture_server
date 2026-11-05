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
  // Story Section
  sectionStatus('story_section_status', 'Story section'),
  requiredShort('story_section_media_alt', 'Story section media alt'),
  requiredShort('story_section_header_title', 'Story section header title'),
  requiredShort('story_section_title', 'Story section title'),
  required('story_section_description', 'Story section description'),

  // Philosophy Section
  sectionStatus('philosophy_section_status', 'Philosophy section'),
  requiredShort('philosophy_section_media_alt', 'Philosophy section media alt'),
  requiredShort('philosophy_section_header_title', 'Philosophy section header title'),
  requiredShort('philosophy_section_title', 'Philosophy section title'),
  required('philosophy_section_description', 'Philosophy section description'),

  // Mission
  requiredShort('mission_title', 'Mission title'),
  required('mission_description', 'Mission description'),

  // Vision
  requiredShort('vision_title', 'Vision title'),
  required('vision_description', 'Vision description'),

  // Highlight Section
  sectionStatus('highlight_section_status', 'Highlight section'),
  requiredShort('highlight_section_header_title', 'Highlight section header title'),
  requiredShort('highlight_section_title', 'Highlight section title'),

  // Promise Section
  sectionStatus('promise_section_status', 'Promise section'),
  requiredShort('promise_section_left_media_alt', 'Promise section left media alt'),
  requiredShort('promise_section_right_media_alt', 'Promise section right media alt'),
  requiredShort('promise_section_header_title', 'Promise section header title'),
  requiredShort('promise_section_title', 'Promise section title'),
  required('promise_section_description', 'Promise section description'),

  // CTA Section
  sectionStatus('cta_section_status', 'CTA section'),
  requiredShort('cta_section_media_alt', 'CTA section media alt'),
  requiredShort('cta_section_header_title', 'CTA section header title'),
  requiredShort('cta_section_title', 'CTA section title'),
  required('cta_section_description', 'CTA section description'),
  requiredShort('cta_section_button_text', 'CTA section button text'),
  required('cta_section_button_link', 'CTA section button link'),
];
