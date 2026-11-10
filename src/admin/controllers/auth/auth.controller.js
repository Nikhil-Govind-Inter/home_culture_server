import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import sendMail from '../../../shared/utils/mailer.js';
import config from '../../../shared/config/index.js';
import ApiError from '../../../shared/utils/ApiError.js';
import sendValidationError from '../../../shared/utils/sendValidationError.js';
import { login, forgotPassword, verifyOtp, resetPassword } from '../../validations/auth/auth.validation.js';
import { models } from '../../../shared/models/index.js';

const { Admin } = models;

const MAX_OTP_ATTEMPTS = 5;
const stripSecrets = ({ password, reset_otp_hash, reset_otp_expires_at, reset_otp_attempts, ...rest }) => rest;

// Checks the OTP for an admin; counts failed attempts. Throws ApiError on any failure.
async function assertValidOtp(email, otp) {
  const admin = await Admin.findOne({ where: { email } });
  const invalid = ApiError.badRequest('Invalid or expired OTP');
  if (!admin || !admin.reset_otp_hash || !admin.reset_otp_expires_at) throw invalid;
  if (admin.reset_otp_expires_at < new Date() || admin.reset_otp_attempts >= MAX_OTP_ATTEMPTS) {
    throw invalid;
  }
  if (!(await bcrypt.compare(otp, admin.reset_otp_hash))) {
    await admin.increment('reset_otp_attempts');
    throw invalid;
  }
  return admin;
}


export default class AuthController {
  static async login(req, res, next) {
    try {
      await Promise.all(login.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);
      const { email, password } = req.body;
      const admin = await Admin.findOne({ where: { email } });
      if (!admin || !(await bcrypt.compare(password, admin.password))) {
        throw ApiError.unauthorized('Invalid email or password');
      }

      const token = jwt.sign({ id: admin.id, email: admin.email, role: 'admin' }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
      });

      const profile = stripSecrets(admin.toJSON());
      res.status(200).json({ success: true, statusCode: 200, message: 'Login successful', data: { token, admin: profile } });
    } catch (err) {
      next(err);
    }
  }

  static async forgotPassword(req, res, next) {
    try {
      await Promise.all(forgotPassword.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);
      const { email } = req.body;

      const admin = await Admin.findOne({ where: { email } });
      if (!admin) throw ApiError.notFound('Email is not registered');

      const otp = String(crypto.randomInt(0, 1000000)).padStart(6, '0');
      await admin.update({
        reset_otp_hash: await bcrypt.hash(otp, 10),
        reset_otp_expires_at: new Date(Date.now() + config.otpExpiresMinutes * 60 * 1000),
        reset_otp_attempts: 0,
      });
      await sendMail({
        to: admin.email,
        subject: 'Your Home Culture password reset code',
        text: `Your OTP is ${otp}. It expires in ${config.otpExpiresMinutes} minutes. If you did not request this, ignore this email.`,
      });
      res.status(200).json({ success: true, statusCode: 200, message: 'OTP has been sent to your email', data: null });
    } catch (err) {
      next(err);
    }
  }

  static async verifyOtp(req, res, next) {
    try {
      await Promise.all(verifyOtp.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);
      await assertValidOtp(req.body.email, req.body.otp);
      res.status(200).json({ success: true, statusCode: 200, message: 'OTP verified', data: null });
    } catch (err) {
      next(err);
    }
  }

  static async resetPassword(req, res, next) {
    try {
      await Promise.all(resetPassword.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);
      const { email, otp, newPassword } = req.body;

      const admin = await assertValidOtp(email, otp);
      await admin.update({
        password: await bcrypt.hash(newPassword, 10),
        reset_otp_hash: null,
        reset_otp_expires_at: null,
        reset_otp_attempts: 0,
      });
      res.status(200).json({ success: true, statusCode: 200, message: 'Password reset successful', data: null });
    } catch (err) {
      next(err);
    }
  }

  static async profile(req, res, next) {
    try {
      const admin = await Admin.findByPk(req.admin.id, { attributes: { exclude: ['password', 'reset_otp_hash', 'reset_otp_expires_at', 'reset_otp_attempts'] } });
      if (!admin) throw ApiError.notFound('Admin not found');
      res.status(200).json({ success: true, statusCode: 200, message: 'Success', data: admin });
    } catch (err) {
      next(err);
    }
  }
}
