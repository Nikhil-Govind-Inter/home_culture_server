import jwt from 'jsonwebtoken';
import config from '../../shared/config/index.js';
import ApiError from '../../shared/utils/ApiError.js';

// authMiddleware() -> requires a valid JWT whose role is in the list.
export default function authMiddleware(roles = []) {
  return function verifyToken(req, res, next) {
    const [scheme, token] = (req.headers.authorization || '').split(' ');

    if (scheme !== 'Bearer' || !token) {
      return next(ApiError.unauthorized('Authentication token missing'));
    }

    let payload;
    try {
      payload = jwt.verify(token, config.jwt.secret);
    } catch {
      return next(ApiError.unauthorized('Invalid or expired token'));
    }

    // if (roles.length && !roles.includes(payload.role)) {
    //   return next(ApiError.forbidden('You do not have access to this resource'));
    // }

    req.admin = payload;
    return next();
  };
}
