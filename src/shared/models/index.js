import sequelize from '../config/sequelize.js';
import logger from '../utils/logger.js';
import defineAboutCms from './aboutCms/aboutCms.model.js';
import defineAboutHighlight from './aboutCms/aboutHighlight.model.js';
import defineAdmin from './auth/admin.model.js';
import defineBanner from './sitesettings/banner.model.js';
import defineBlog from './blog/blog.model.js';
import defineBlogCms from './blog/blogCms.model.js';
import defineContactCms from './contactCms/contactCms.model.js';
import defineFaq from './faqCms/faq.model.js';
import defineFaqCms from './faqCms/faqCms.model.js';
import defineFaqCategory from './faqCms/faqCategory.model.js';
import defineExperienceCms from './experienceCms/experienceCms.model.js';
import defineExperienceHighlight from './experienceCms/experienceHighlight.model.js';
import defineExperienceFaq from './experienceCms/experienceFaq.model.js';
import defineExperienceFeature from './experienceCms/experienceFeature.model.js';
import defineExperienceTimeline from './experienceCms/experienceTimeline.model.js';
import defineLocation from './experienceCms/location.model.js';
import defineBookingProcess from './experienceCms/bookingProcess.model.js';
import defineJourneyProcess from './experienceCms/journeyProcess.model.js';
import defineHowItWorksCms from './howItWorks/howItWorksCms.model.js';
import defineJourneyStep from './howItWorks/journeyStep.model.js';
import defineMetaData from './sitesettings/metaData.model.js';
import definePrivacyPolicy from './privacyPolicy/privacyPolicy.model.js';
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
  BlogCms: defineBlogCms(sequelize),
  Faq: defineFaq(sequelize),
  FaqCms: defineFaqCms(sequelize),
  FaqCategory: defineFaqCategory(sequelize),
  ExperienceCms: defineExperienceCms(sequelize),
  ExperienceHighlight: defineExperienceHighlight(sequelize),
  ExperienceFaq: defineExperienceFaq(sequelize),
  ExperienceFeature: defineExperienceFeature(sequelize),
  ExperienceTimeline: defineExperienceTimeline(sequelize),
  Location: defineLocation(sequelize),
  BookingProcess: defineBookingProcess(sequelize),
  JourneyProcess: defineJourneyProcess(sequelize),
  HowItWorksCms: defineHowItWorksCms(sequelize),
  JourneyStep: defineJourneyStep(sequelize),
  MetaData: defineMetaData(sequelize),
  ContactCms: defineContactCms(sequelize),
  PrivacyPolicy: definePrivacyPolicy(sequelize),
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
