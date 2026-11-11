import sequelize from '../config/sequelize.js';
import logger from '../utils/logger.js';

// About
import defineHomeCms from './home/homeCms.model.js';
import defineHomeBanner from './home/homeBanner.model.js';
import defineHomeHighlight from './home/highlights.model.js';
import defineHomeExperience from './home/homeExperience.model.js';
import defineHomeBrokenProcess from './home/brokenProcess.model.js';
import defineHomeProcessStep from './home/processSteps.model.js';
import defineHomeSimplyChoose from './home/simplyChoose.model.js';
import defineAboutCms from './aboutCms/aboutCms.model.js';
import defineAboutHighlight from './aboutCms/aboutHighlight.model.js';

// Auth
import defineAdmin from './auth/admin.model.js';

// Blog
import defineBlog from './blog/blog.model.js';
import defineBlogCategory from './blog/blogCategory.model.js';
import defineBlogCms from './blog/blogCms.model.js';

// Career
import defineCareerCms from './careerCms/careerCms.model.js';
import defineCareerBenefit from './careerCms/careerBenefit.model.js';
import defineCareerVision from './careerCms/careerVision.model.js';
import defineDepartment from './careerCms/department.model.js';
import defineJob from './careerCms/jobs.model.js';

// Contact
import defineContactCms from './contactCms/contactCms.model.js';

// Experience
import defineExperienceCms from './experienceCms/experienceCms.model.js';
import defineExperienceHighlight from './experienceCms/experienceHighlight.model.js';
import defineExperienceFaq from './experienceCms/experienceFaq.model.js';
import defineExperienceFeature from './experienceCms/experienceFeature.model.js';
import defineExperienceTimeline from './experienceCms/experienceTimeline.model.js';
import defineLocation from './experienceCms/location.model.js';
import defineBookingProcess from './experienceCms/bookingProcess.model.js';
import defineJourneyProcess from './experienceCms/journeyProcess.model.js';

// FAQ
import defineFaq from './faqCms/faq.model.js';
import defineFaqCms from './faqCms/faqCms.model.js';
import defineFaqCategory from './faqCms/faqCategory.model.js';

// How it works
import defineHowItWorksCms from './howItWorks/howItWorksCms.model.js';
import defineJourneyStep from './howItWorks/journeyStep.model.js';
import defineTestimonial from './howItWorks/testimonial.model.js';
import defineWorkshopMaterial from './howItWorks/workshopMaterial.model.js';

// Masters
import defineState from './masters/state.model.js';
import defineCity from './masters/city.model.js';

// Privacy policy
import definePrivacyPolicy from './privacyPolicy/privacyPolicy.model.js';

// Site settings
import defineBanner from './sitesettings/banner.model.js';
import defineMetaData from './sitesettings/metaData.model.js';
import defineSiteSettings from './sitesettings/siteSettings.model.js';
import defineSocialMedia from './sitesettings/socialMedia.model.js';

const models = {
  // About
  AboutCms: defineAboutCms(sequelize),
  AboutHighlight: defineAboutHighlight(sequelize),

  // Auth
  Admin: defineAdmin(sequelize),

  // Blog
  Blog: defineBlog(sequelize),
  BlogCategory: defineBlogCategory(sequelize),
  BlogCms: defineBlogCms(sequelize),

  // Career
  CareerCms: defineCareerCms(sequelize),
  CareerBenefit: defineCareerBenefit(sequelize),
  CareerVision: defineCareerVision(sequelize),
  Department: defineDepartment(sequelize),
  Job: defineJob(sequelize),

  // Home
  HomeCms: defineHomeCms(sequelize),
  HomeBanner: defineHomeBanner(sequelize),
  HomeHighlight: defineHomeHighlight(sequelize),
  HomeExperience: defineHomeExperience(sequelize),
  HomeBrokenProcess: defineHomeBrokenProcess(sequelize),
  HomeProcessStep: defineHomeProcessStep(sequelize),
  HomeSimplyChoose: defineHomeSimplyChoose(sequelize),

  // Contact
  ContactCms: defineContactCms(sequelize),

  // Experience
  ExperienceCms: defineExperienceCms(sequelize),
  ExperienceHighlight: defineExperienceHighlight(sequelize),
  ExperienceFaq: defineExperienceFaq(sequelize),
  ExperienceFeature: defineExperienceFeature(sequelize),
  ExperienceTimeline: defineExperienceTimeline(sequelize),
  Location: defineLocation(sequelize),
  BookingProcess: defineBookingProcess(sequelize),
  JourneyProcess: defineJourneyProcess(sequelize),

  // FAQ
  Faq: defineFaq(sequelize),
  FaqCms: defineFaqCms(sequelize),
  FaqCategory: defineFaqCategory(sequelize),

  // How it works
  HowItWorksCms: defineHowItWorksCms(sequelize),
  JourneyStep: defineJourneyStep(sequelize),
  Testimonial: defineTestimonial(sequelize),
  WorkshopMaterial: defineWorkshopMaterial(sequelize),

  // Masters
  State: defineState(sequelize),
  City: defineCity(sequelize),

  // Privacy policy
  PrivacyPolicy: definePrivacyPolicy(sequelize),

  // Site settings
  Banner: defineBanner(sequelize),
  MetaData: defineMetaData(sequelize),
  SiteSettings: defineSiteSettings(sequelize),
  SocialMedia: defineSocialMedia(sequelize),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    logger.info('Associating', modelName);
    models[modelName].associate(models);
  }
});

export { sequelize, models };
