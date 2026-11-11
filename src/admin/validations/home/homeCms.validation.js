import { body } from 'express-validator';

const hasContent = (value) =>
  /<(img|iframe|video)\b/i.test(value) || value.replace(/<[^>]*>/g, '').replace(/&nbsp;|\s/g, '').length > 0;

const required = (field, label) =>
  body(field)
    .isString().withMessage(`${label} is required`)
    .trim()
    .notEmpty().withMessage(`${label} is required`);

const requiredShort = (field, label) =>
  required(field, label).isLength({ max: 255 }).withMessage(`${label} must be at most 255 characters`);

const requiredRich = (field, label) =>
  required(field, label).custom(hasContent).withMessage(`${label} is required`);

const mediaType = (field, label) =>
  body(field)
    .isString().withMessage(`${label} media type is required`)
    .isIn(['image', 'video']).withMessage(`${label} media type must be image or video`);

const sectionStatus = (field, label) =>
  body(field).optional().isBoolean().withMessage(`${label} status must be a boolean`).toBoolean();

export const validationRequestPut = [
  // Section One - Challenges
  sectionStatus('challenges_section_status', 'Challenges section'),
  requiredShort('challenges_section_header_title', 'Challenges header title'),
  requiredShort('challenges_section_title', 'Challenges title'),
  requiredRich('challenges_section_description', 'Challenges description'),
  requiredShort('challenges_section_right_title', 'Challenges right title'),
  requiredShort('challenges_section_button_text', 'Challenges button text'),
  requiredShort('challenges_section_button_link', 'Challenges button link'),

  // Section Two - Ownership
  sectionStatus('ownership_status', 'Ownership section'),
  mediaType('ownership_media_type', 'Ownership'),
  requiredShort('ownership_mobile_media_alt', 'Ownership media alt'),
  requiredShort('ownership_header_title', 'Ownership header title'),
  requiredShort('ownership_title', 'Ownership title'),
  requiredRich('ownership_description', 'Ownership description'),
  requiredShort('ownership_choose_title', 'Ownership choose title'),
  requiredShort('ownership_button_text', 'Ownership button text'),
  requiredShort('ownership_button_link', 'Ownership button link'),

  // Section Three - Welcome
  sectionStatus('welcome_section_status', 'Welcome section'),
  requiredShort('welcome_section_header_title', 'Welcome header title'),
  requiredShort('welcome_section_title', 'Welcome title'),
  requiredRich('welcome_section_description', 'Welcome description'),

  // Section Four - Style
  sectionStatus('style_section_status', 'Style section'),
  requiredShort('style_section_title', 'Style title'),

  // Section Five - Experience
  sectionStatus('experience_section_status', 'Experience section'),
  requiredShort('experience_section_header_title', 'Experience header title'),
  requiredShort('experience_section_title', 'Experience title'),
  requiredShort('modal_title', 'Modal title'),
  requiredRich('modal_description', 'Modal description'),
  requiredShort('button_one_text', 'Button one text'),
  requiredShort('button_one_link', 'Button one link'),
  requiredShort('button_two_text', 'Button two text'),
  requiredShort('phone', 'Phone'),
  requiredShort('whatsapp_number', 'WhatsApp number'),

  // Section Six - Journey
  sectionStatus('journey_section_status', 'Journey section'),
  requiredShort('journey_section_header_title', 'Journey header title'),
  requiredShort('journey_section_title', 'Journey title'),
  mediaType('journey_section_media_type', 'Journey'),
  requiredShort('journey_section_media_alt', 'Journey media alt'),
  requiredRich('journey_section_description', 'Journey description'),
  requiredShort('journey_section_button_text', 'Journey button text'),
  requiredShort('journey_section_button_link', 'Journey button link'),

  // Section Seven - Insights
  sectionStatus('insights_status', 'Insights section'),
  requiredShort('insights_header_title', 'Insights header title'),
  requiredShort('insights_title', 'Insights title'),
  requiredRich('insights_description', 'Insights description'),
  requiredShort('insights_button_text', 'Insights button text'),
  requiredShort('insights_button_link', 'Insights button link'),

  // Section Eight - CTA
  sectionStatus('cta_status', 'CTA section'),
  requiredShort('cta_media_alt', 'CTA media alt'),
  requiredShort('cta_header_title', 'CTA header title'),
  requiredShort('cta_title', 'CTA title'),
  required('cta_description', 'CTA description'),
  requiredShort('cta_button_one_text', 'CTA button one text'),
  requiredShort('cta_button_one_link', 'CTA button one link'),
  requiredShort('cta_button_two_text', 'CTA button two text'),
  requiredShort('cta_button_two_link', 'CTA button two link'),
];
