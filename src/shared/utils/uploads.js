import uploadedPath from './uploadedPath.js';
import deleteUpload from './deleteUpload.js';

// Public paths of files uploaded in this request for the given multer fields.
export const newUploads = (req, fields, folder) =>
  fields.map((field) => uploadedPath(req, field, folder)).filter(Boolean);

// Deletes files uploaded in this request (use when validation or the handler fails).
export const cleanupUploads = async (req, fields, folder) => {
  await Promise.all(newUploads(req, fields, folder).map((p) => deleteUpload(p)));
};
