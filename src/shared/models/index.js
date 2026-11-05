import sequelize from '../config/sequelize.js';
import logger from '../utils/logger.js';
import defineAboutCms from './aboutCms/aboutCms.model.js';
import defineAboutHighlight from './aboutCms/aboutHighlight.model.js';
import defineAdmin from './auth/admin.model.js';
import defineBanner from './sitesettings/banner.model.js';
import defineBlog from './blog/blog.model.js';
import defineContactCms from './contactCms/contactCms.model.js';
import defineHowItWorksCms from './howItWorks/howItWorksCms.model.js';
import defineJourneyStep from './howItWorks/journeyStep.model.js';
import defineMetaData from './sitesettings/metaData.model.js';
import defineSiteSettings from './sitesettings/siteSettings.model.js';
import defineSocialMedia from './sitesettings/socialMedia.model.js';
import defineTestimonial from './howItWorks/testimonial.model.js';
import defineWorkshopMaterial from './howItWorks/workshopMaterial.model.js';

const models = {
  AboutCms: defineAboutCms(sequelize),
  AboutHighlight: defineAboutHighlight(sequelize),
  Admin: defineAdmin(sequelize),
  Banner: defineBanner(sequelize),
  Blog: defineBlog(sequelize),
  HowItWorksCms: defineHowItWorksCms(sequelize),
  JourneyStep: defineJourneyStep(sequelize),
  MetaData: defineMetaData(sequelize),
  ContactCms: defineContactCms(sequelize),
  SocialMedia: defineSocialMedia(sequelize),
  SiteSettings: defineSiteSettings(sequelize),
  Testimonial: defineTestimonial(sequelize),
  WorkshopMaterial: defineWorkshopMaterial(sequelize),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    logger.info('Associating', modelName);
    models[modelName].associate(models);
  }
});

export { sequelize, models };
