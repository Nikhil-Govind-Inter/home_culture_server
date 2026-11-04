import fs from 'node:fs/promises';
import path from 'node:path';
import config from '../config/index.js';
import logger from './logger.js';

// Deletes an uploaded file by its public path (e.g. "/uploads/blogs/123.jpg"). Missing files are ignored.
export default async function deleteUpload(filePath) {
  if (!filePath) return;
  try {
    await fs.unlink(path.join(config.uploadDir, filePath.replace('/uploads/', '')));
    logger.info(`Deleted file: ${filePath}`);
  } catch (error) {
    if (error.code !== 'ENOENT') logger.error(`Failed to delete file ${filePath}: ${error.message}`);
  }
}
