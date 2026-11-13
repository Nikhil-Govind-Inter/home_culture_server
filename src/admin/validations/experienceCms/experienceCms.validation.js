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
  // Intro Section
  sectionStatus('intro_section_status', 'Intro section'),
  requiredShort('intro_section_media_alt', 'Intro section media alt'),
  requiredShort('intro_section_header_title', 'Intro section header title'),
  requiredShort('intro_section_title', 'Intro section title'),
  required('intro_section_quote', 'Intro section quote'),
  required('intro_section_description', 'Intro section description'),

  // Journey Section
  sectionStatus('journey_section_status', 'Journey section'),
  requiredShort('journey_section_header_title', 'Journey section header title'),
  requiredShort('journey_section_title', 'Journey section title'),
  required('journey_section_description', 'Journey section description'),

  // Lifestyle Section
  sectionStatus('lifestyle_status', 'Lifestyle section'),
  requiredShort('lifestyle_header_title', 'Lifestyle header title'),
  requiredShort('lifestyle_title', 'Lifestyle title'),
  required('lifestyle_description', 'Lifestyle description'),

  // Visit Section
  sectionStatus('visit_section_status', 'Visit section'),
  body('visit_section_media_type')
    .optional()
    .isIn(['image', 'video']).withMessage('Visit section media type must be image or video'),
  requiredShort('visit_section_media_alt', 'Visit section media alt'),
  requiredShort('visit_section_header_title', 'Visit section header title'),
  requiredShort('visit_section_title', 'Visit section title'),
  required('visit_section_description', 'Visit section description'),

  // Feature Section
  sectionStatus('feature_section_status', 'Feature section'),
  requiredShort('feature_section_header_title', 'Feature section header title'),
  requiredShort('feature_section_title', 'Feature section title'),

  // Booking Process
  sectionStatus('booking_process_status', 'Booking process'),
  requiredShort('booking_process_header_title', 'Booking process header title'),
  requiredShort('booking_process_title', 'Booking process title'),

  // FAQ Section
  sectionStatus('faq_section_status', 'FAQ section'),
  requiredShort('faq_section_header_title', 'FAQ section header title'),
  requiredShort('faq_section_title', 'FAQ section title'),
  required('faq_section_description', 'FAQ section description'),

  // Enquiry Section
  sectionStatus('enquiry_section_status', 'Enquiry section'),
  requiredShort('enquiry_section_header_title', 'Enquiry section header title'),
  requiredShort('enquiry_section_title', 'Enquiry section title'),
  required('enquiry_section_description', 'Enquiry section description'),
];
