import { body } from 'express-validator';

export const login = [
  body('email').isEmail().withMessage('email must be a valid email'),
  body('password').notEmpty().withMessage('password is required'),
];

const otpRule = body('otp').matches(/^\d{6}$/).withMessage('otp must be a 6-digit code');
const emailRule = body('email').isEmail().withMessage('email must be a valid email');

export const forgotPassword = [emailRule];

export const verifyOtp = [emailRule, otpRule];

export const resetPassword = [
  emailRule,
  otpRule,
  body('newPassword')
    .isLength({ min: 8, max: 128 })
    .withMessage('newPassword must be between 8 and 128 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('newPassword must contain lowercase, uppercase, number, and special char'),
  body('confirmPassword')
    .custom((value, { req }) => value === req.body.newPassword)
    .withMessage('confirmPassword must match newPassword'),
];
