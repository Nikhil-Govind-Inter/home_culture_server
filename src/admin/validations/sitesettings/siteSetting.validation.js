import { body } from 'express-validator';

const requiredFields = (field, label) =>
  body(field).notEmpty().withMessage(`${label} cannot be empty`).isString().withMessage(`${label} must be a string`).trim();

// All fields are optional here; the controller requires them when creating the first record.
export const validationRequestPut = [
  requiredFields('header_logo_alt', 'Header logo alt'),
  requiredFields('footer_logo_alt', 'Footer logo alt'),
  requiredFields('header_button_text', 'Header button text'),
  requiredFields('header_button_link', 'Header button link'),
  requiredFields('footer_title', 'Footer title'),
  requiredFields('description', 'Description'),
  requiredFields('address', 'Address'),
  requiredFields('phone', 'Phone'),
  body('email').isEmail().withMessage('Email must be a valid email').trim(),
  
];
