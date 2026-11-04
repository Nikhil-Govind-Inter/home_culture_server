import { body } from 'express-validator';

export const login = [
  body('email').isEmail().withMessage('email must be a valid email'),
  body('password').notEmpty().withMessage('password is required'),
];
