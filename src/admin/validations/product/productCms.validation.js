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

export const validationRequestPut = [
  // Product / Style / Trim / Size / Add-ons sections
  requiredShort('product_section_title', 'Product section title'),
  requiredRich('product_section_description', 'Product section description'),
  requiredShort('style_section_title', 'Style section title'),
  requiredRich('style_section_description', 'Style section description'),
  requiredShort('trim_section_title', 'Trim section title'),
  requiredRich('trim_section_description', 'Trim section description'),
  requiredShort('size_section_title', 'Size section title'),
  requiredRich('size_section_description', 'Size section description'),
  requiredShort('add_ons_section_title', 'Add-ons section title'),
  requiredRich('add_ons_section_description', 'Add-ons section description'),

  // Summary Section
  requiredShort('summary_section_title', 'Summary section title'),
  requiredRich('summary_section_description', 'Summary section description'),
  requiredShort('summary_section_media_alt', 'Summary section media alt'),
  requiredShort('summary_section_media_header_title', 'Summary section media header title'),
  requiredShort('summary_section_media_title', 'Summary section media title'),

  // CTA Section
  body('cta_section_status').optional().isBoolean().withMessage('CTA section status must be a boolean').toBoolean(),
  requiredShort('cta_section_media_alt', 'CTA section media alt'),
  requiredShort('cta_section_header_title', 'CTA section header title'),
  requiredShort('cta_section_title', 'CTA section title'),
  requiredRich('cta_section_description', 'CTA section description'),
  requiredShort('cta_section_button_text', 'CTA section button text'),
  required('cta_section_button_link', 'CTA section button link'),
];
