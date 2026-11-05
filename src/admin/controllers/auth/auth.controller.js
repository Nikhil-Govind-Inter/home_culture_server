import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../../shared/config/index.js';
import ApiError from '../../../shared/utils/ApiError.js';
import ApiResponse from '../../../shared/utils/ApiResponse.js';
import sendValidationError from '../../../shared/utils/sendValidationError.js';
import { login } from '../../validations/auth.validation.js';
import { models } from '../../../shared/models/index.js';

const { Admin } = models;


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

      const { password: _password, ...profile } = admin.toJSON();
      ApiResponse.success(res, { token, admin: profile }, 'Login successful');
    } catch (err) {
      next(err);
    }
  }

  static async profile(req, res, next) {
    try {
      const admin = await Admin.findByPk(req.admin.id, { attributes: { exclude: ['password'] } });
      if (!admin) throw ApiError.notFound('Admin not found');
      ApiResponse.success(res, admin);
    } catch (err) {
      next(err);
    }
  }
}
