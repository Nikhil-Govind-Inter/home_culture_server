import ApiError from '../utils/ApiError.js';
import config from '../config/index.js';
import logger from '../utils/logger.js';

export const notFoundHandler = (req, res, next) => {
  next(ApiError.notFound(`Route ${req.method} ${req.originalUrl} not found`));
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message, details = null } = err;

  if (err.name === 'MulterError') {
    statusCode = 400;
  }

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 400;
    message = err.errors?.map((e) => e.message).join(', ') || err.message;
  }

  if (statusCode >= 500) logger.error(err);

  res.status(statusCode).json({
    success: false,
    statusCode,
    message: statusCode >= 500 && config.env === 'production' ? 'Internal server error' : message,
    ...(details && { details }),
    ...(config.env !== 'production' && statusCode >= 500 && { stack: err.stack }),
  });
};
