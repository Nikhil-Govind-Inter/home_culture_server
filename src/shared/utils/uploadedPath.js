// Public URL path of an uploaded file (set by multer), or undefined if none was sent.
export default function uploadedPath(req, field, folder) {
  const file = req.files?.[field]?.[0];
  return file ? `/uploads/${folder}/${file.filename}` : undefined;
}
