import sequelize from '../config/sequelize.js';
import logger from '../utils/logger.js';
import defineAdmin from './admin.model.js';
import definePage from './page.model.js';
import defineBanner from './banner.model.js';
import defineBlog from './blog.model.js';
import defineContactCms from './contactCms.model.js';

const models = {
  Admin: defineAdmin(sequelize),
  Page: definePage(sequelize),
  Banner: defineBanner(sequelize),
  Blog: defineBlog(sequelize),
  ContactCms: defineContactCms(sequelize),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    logger.info('Associating', modelName);
    models[modelName].associate(models);
  }
});

export { sequelize, models };
