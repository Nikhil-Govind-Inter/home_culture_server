import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const config = {
  uploadDir: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../uploads'),
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  corsOrigin: process.env.CORS_ORIGIN || '*',
  // Public base URL prepended to stored `/uploads/...` paths in public API responses.
  mediaBaseUrl: (process.env.MEDIA_BASE_URL || `http://localhost:${Number(process.env.PORT) || 5000}`).replace(/\/+$/, ''),
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER,
    pass: (process.env.SMTP_PASS).replace(/\s/g, ''),
    from: process.env.SMTP_USER,
  },
  otpExpiresMinutes: Number(process.env.OTP_EXPIRES_MINUTES) || 10,
  seedAdmin: {
    name: process.env.ADMIN_NAME || 'Admin',
    email: process.env.ADMIN_EMAIL || 'admin@intersmart.in',
    password: process.env.ADMIN_PASSWORD || 'admin123',
  },
};

export default config;

