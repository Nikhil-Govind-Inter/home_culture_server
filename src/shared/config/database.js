import { sequelize } from '../models/index.js';
import logger from '../utils/logger.js';

export default class Database {
  static async connect() {
    await sequelize.authenticate();
    await sequelize.sync();
    logger.info('PostgreSQL connected');
  }

  static async disconnect() {
    await sequelize.close();
  }
}
