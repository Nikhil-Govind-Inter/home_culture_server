import app from './app.js';
import config from './shared/config/index.js';
import Database from './shared/config/database.js';
import logger from './shared/utils/logger.js';

async function bootstrap() {
  await Database.connect();

  const server = app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port} (${config.env})`);
  });


  const shutdown = async () => {
    logger.info('Shutting down server...');

    server.close(async () => {
      await Database.disconnect();
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

bootstrap().catch((err) => {
  logger.error('Failed to start server:', err);
  process.exit(1);
});