// Sends a 400 response (same shape as the global error handler) for failed express-validator checks.
export default function sendValidationError(res, errors) {
  const details = errors.array().map(({ path, msg, location }) => ({ field: path, message: msg, location }));
  return res.status(400).json({ success: false, statusCode: 400, message: 'Validation failed', details });
}
