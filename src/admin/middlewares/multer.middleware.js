import fs from 'node:fs';
import path from 'node:path';
import multer from 'multer';
import config from '../../shared/config/index.js';
import ApiError from '../../shared/utils/ApiError.js';

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const SVG_ONLY = {
  mimeTypes: ['image/svg+xml'],
  extensions: ['.svg'],
  message: 'Only svg images are allowed',
};
export const SVG_UPLOAD = SVG_ONLY;

// Images or short videos (home page hero/journey media).
export const MEDIA_UPLOAD = {
  mimeTypes: [...IMAGE_TYPES, 'video/mp4', 'video/webm'],
  extensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.webm'],
  message: 'Only jpeg, png, webp, gif images or mp4, webm videos are allowed',
};
export const MEDIA_MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

// createUploadMiddleware('banners', [{ name: 'image', maxCount: 1 }])
// Optional third argument restricts types: { mimeTypes, extensions, message } (e.g. SVG_UPLOAD).
// Saves files to uploads/<folder>/ and exposes them as req.files[<field>].
export function createUploadMiddleware(folder, fields, restrict, maxFileSize = MAX_FILE_SIZE) {
  const destination = path.join(config.uploadDir, folder);
  fs.mkdirSync(destination, { recursive: true });

  const storage = multer.diskStorage({
    destination,
    filename(req, file, cb) {
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${unique}${path.extname(file.originalname).toLowerCase()}`);
    },
  });

  const fileFilter = function fileFilter(req, file, cb) {
    if (restrict) {
      const ext = path.extname(file.originalname).toLowerCase();
      if (restrict.mimeTypes.includes(file.mimetype) && restrict.extensions.includes(ext)) return cb(null, true);
      return cb(ApiError.badRequest(restrict.message));
    }
    if (IMAGE_TYPES.includes(file.mimetype)) return cb(null, true);
    return cb(ApiError.badRequest('Only jpeg, png, webp or gif images are allowed'));
  };

  return multer({ storage, fileFilter, limits: { fileSize: maxFileSize } }).fields(fields);
}
