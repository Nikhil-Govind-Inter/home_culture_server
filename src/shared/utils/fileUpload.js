import path from 'node:path';
import deleteUpload from './deleteUpload.js';
import logger from './logger.js';

// Public URL path (e.g. "/uploads/blogs/123.jpg") of a multer-saved file.
const publicPath = (file) => `/uploads/${path.basename(file.destination)}/${file.filename}`;

// Create: copies uploaded file paths into req.body[field].
export function handleFileUploadStore(req, fileFields = []) {
  fileFields.forEach((field) => {
    const file = req.files?.[field]?.[0];
    if (file) req.body[field] = publicPath(file);
  });
}

// Update: copies new file paths into req.body[field] and deletes the replaced file stored on `data`.
export async function handleFileUploadUpdate(req, data, fileFields = []) {
  for (const field of fileFields) {
    const file = req.files?.[field]?.[0];
    if (!file) continue;

    if (data?.[field]) {
      try {
        await deleteUpload(data[field]);
      } catch (error) {
        logger.error(`Failed to delete old file for field "${field}": ${error.message}`);
      }
    }

    req.body[field] = publicPath(file);
  }
}
