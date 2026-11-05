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
  // Vision Section
  sectionStatus('vision_section_status', 'Vision section'),
  requiredShort('vision_section_media_alt', 'Vision section media alt'),
  requiredShort('vision_section_header_title', 'Vision section header title'),
  requiredShort('vision_section_title', 'Vision section title'),
  required('vision_section_description', 'Vision section description'),

  // Workshop Section
  sectionStatus('workshop_section_status', 'Workshop section'),
  requiredShort('workshop_section_media_alt', 'Workshop section media alt'),
  requiredShort('workshop_section_header_title', 'Workshop section header title'),
  requiredShort('workshop_section_title', 'Workshop section title'),
  required('workshop_section_description', 'Workshop section description'),

  // Artisans Section
  sectionStatus('artisans_section_status', 'Artisans section'),
  requiredShort('artisans_section_header_title', 'Artisans section header title'),
  requiredShort('artisans_section_title', 'Artisans section title'),
  required('artisans_section_description', 'Artisans section description'),

  // Journey Section
  sectionStatus('journey_section_status', 'Journey section'),
  requiredShort('journey_section_title', 'Journey section title'),
  requiredShort('journey_section_media_alt', 'Journey section media alt'),

  // CTA Section
  sectionStatus('cta_status', 'CTA section'),
  requiredShort('cta_media_alt', 'CTA media alt'),
  requiredShort('cta_header_title', 'CTA header title'),
  requiredShort('cta_title', 'CTA title'),
  required('cta_description', 'CTA description'),
  requiredShort('cta_button_text', 'CTA button text'),
  required('cta_button_link', 'CTA button link'),
];
