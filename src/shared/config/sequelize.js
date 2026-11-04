import { Sequelize } from 'sequelize';
import config from './index.js';

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
