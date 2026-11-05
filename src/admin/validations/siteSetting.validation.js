import { body } from 'express-validator';

const text = (field, label) =>
  body(field).optional().notEmpty().withMessage(`${label} cannot be empty`).isString().withMessage(`${label} must be a string`).trim();

// All fields are optional here; the controller requires them when creating the first record.
export const validationRequestPut = [
  text('logo_alt', 'Logo alt'),
  text('footer_title', 'Footer title'),
  text('description', 'Description'),
  text('address', 'Address'),
  text('phone', 'Phone'),
  body('email').optional().isEmail().withMessage('Email must be a valid email').trim(),
];
