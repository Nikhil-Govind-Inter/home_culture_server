import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './shared/config/index.js';
import frontendRoutes from './frontend/routes/index.js';
import adminRoutes from './admin/routes/index.js';
import { notFoundHandler, errorHandler } from './shared/middlewares/error.middleware.js';

export default class App {
  static create() {
    const app = express();
    App.initMiddlewares(app);
    App.initRoutes(app);
    App.initErrorHandling(app);
    return app;
  }

  static initMiddlewares(app) {
    app.use(helmet());
    app.use(cors({ origin: config.corsOrigin }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    if (config.env !== 'test') app.use(morgan('dev'));
  }

  static initRoutes(app) {
    app.get('/health', (req, res) => res.json({ status: 'ok' }));
    app.use('/uploads', express.static(config.uploadDir)); // uploaded media
    app.use('/api', frontendRoutes); // public
    app.use('/admin', adminRoutes); // private (JWT)
  }

  static initErrorHandling(app) {
    app.use(notFoundHandler);
    app.use(errorHandler);
  }
}
