import config from './shared/config/index.js';
import Database from './shared/config/database.js';
import { models } from './shared/models/index.js';
import { hashPassword } from './admin/controllers/auth.controller.js';
import logger from './shared/utils/logger.js';

// Creates the first admin user: npm run seed
async function seed() {
  await Database.connect();
  const { name, email, password } = config.seedAdmin;
  const [, created] = await models.Admin.findOrCreate({
    where: { email },
    defaults: { name, password: await hashPassword(password) },
  });
  logger.info(created ? `Admin created: ${email}` : `Admin already exists: ${email}`);
  await Database.disconnect();
}

seed().catch((err) => {
  logger.error(err);
  process.exit(1);
});
