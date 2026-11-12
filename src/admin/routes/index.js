import express from 'express';

// Auth
import authRoutes from './auth/auth.routes.js';

// Site settings
import bannerRoutes from './sitesettings/banner.routes.js';
import metaDataRoutes from './sitesettings/metaData.routes.js';
import siteSettingsRoutes from './sitesettings/siteSettings.routes.js';
import socialMediaRoutes from './sitesettings/socialMedia.routes.js';

// Blog
import blogRoutes from './blog/blog.routes.js';
import blogCategoryRoutes from './blog/blogCategory.routes.js';
import blogCmsRoutes from './blog/blogCms.routes.js';

// Career CMS
import careerCmsRoutes from './careerCms/careerCms.routes.js';
import careerVisionRoutes from './careerCms/careerVision.routes.js';
import careerBenefitRoutes from './careerCms/careerBenefit.routes.js';

import departmentRoutes from './careerCms/department.routes.js';
import jobRoutes from './careerCms/job.routes.js';

// Masters
import stateRoutes from './masters/state.routes.js';
import cityRoutes from './masters/city.routes.js';

// Home CMS
import homeCmsRoutes from './home/homeCms.routes.js';
import homeBannerRoutes from './home/homeBanner.routes.js';
import homeHighlightRoutes from './home/homeHighlight.routes.js';
import homeExperienceRoutes from './home/homeExperience.routes.js';
import homeBrokenProcessRoutes from './home/homeBrokenProcess.routes.js';
import homeProcessStepRoutes from './home/homeProcessStep.routes.js';
import homeSimplyChooseRoutes from './home/homeSimplyChoose.routes.js';

// Contact CMS
import contactCmsRoutes from './contactCms/contactCms.routes.js';

// Privacy policy
import privacyPolicyRoutes from './privacyPolicy/privacyPolicy.routes.js';

// About CMS
import aboutCmsRoutes from './aboutCms/aboutCms.routes.js';
import aboutHighlightRoutes from './aboutCms/aboutHighlight.routes.js';

// Experience CMS
import experienceCmsRoutes from './experienceCms/experienceCms.routes.js';
import journeyProcessRoutes from './experienceCms/journeyProcess.routes.js';
import bookingProcessRoutes from './experienceCms/bookingProcess.routes.js';
import experienceHighlightRoutes from './experienceCms/experienceHighlight.routes.js';
import experienceFaqRoutes from './experienceCms/experienceFaq.routes.js';
import experienceFeatureRoutes from './experienceCms/experienceFeature.routes.js';
import experienceTimelineRoutes from './experienceCms/experienceTimeline.routes.js';
import locationRoutes from './experienceCms/location.routes.js';

// FAQ CMS
import faqCmsRoutes from './faqCms/faqCms.routes.js';
import faqCategoryRoutes from './faqCms/faqCategory.routes.js';
import faqRoutes from './faqCms/faq.routes.js';

// How it works CMS
import howItWorksCmsRoutes from './howItWorksCms/howItWorksCms.routes.js';
import journeyStepRoutes from './howItWorksCms/journeyStep.routes.js';
import testimonialRoutes from './howItWorksCms/testimonial.routes.js';
import workshopMaterialRoutes from './howItWorksCms/workshopMaterial.routes.js';

// Product
import productCmsRoutes from './product/productCms.routes.js';
import productStyleRoutes from './product/productStyle.routes.js';
import productTrimRoutes from './product/productTrim.routes.js';
import productSizeRoutes from './product/productSize.routes.js';
import productAddOnRoutes from './product/productAddOn.routes.js';
import productRoutes from './product/product.routes.js';

const router = express.Router();

// Auth
router.use('/auth', authRoutes);

// Site settings
router.use('/banners', bannerRoutes);
router.use('/meta-data', metaDataRoutes);
router.use('/site-settings', siteSettingsRoutes);
router.use('/social-media', socialMediaRoutes);

// Blog
router.use('/blogs', blogRoutes);
router.use('/blog-categories', blogCategoryRoutes);
router.use('/blog-cms', blogCmsRoutes);

// Career CMS
router.use('/career-cms', careerCmsRoutes);
router.use('/career-visions', careerVisionRoutes);
router.use('/career-benefits', careerBenefitRoutes);
router.use('/departments', departmentRoutes);
router.use('/jobs', jobRoutes);

// Masters
router.use('/states', stateRoutes);
router.use('/cities', cityRoutes);

// Home CMS
router.use('/home-cms', homeCmsRoutes);
router.use('/home-banners', homeBannerRoutes);
router.use('/home-highlights', homeHighlightRoutes);
router.use('/home-experiences', homeExperienceRoutes);
router.use('/home-broken-processes', homeBrokenProcessRoutes);
router.use('/home-process-steps', homeProcessStepRoutes);
router.use('/home-simply-choose', homeSimplyChooseRoutes);

// Contact CMS
router.use('/contact-cms', contactCmsRoutes);

// Privacy policy
router.use('/privacy-policy', privacyPolicyRoutes);

// About CMS
router.use('/about-cms', aboutCmsRoutes);
router.use('/about-highlights', aboutHighlightRoutes);

// Experience CMS
router.use('/experience-cms', experienceCmsRoutes);
router.use('/journey-processes', journeyProcessRoutes);
router.use('/booking-processes', bookingProcessRoutes);
router.use('/experience-highlights', experienceHighlightRoutes);
router.use('/experience-faqs', experienceFaqRoutes);
router.use('/experience-features', experienceFeatureRoutes);
router.use('/experience-timeline', experienceTimelineRoutes);
router.use('/locations', locationRoutes);

// FAQ CMS
router.use('/faq-cms', faqCmsRoutes);
router.use('/faq-categories', faqCategoryRoutes);
router.use('/faqs', faqRoutes);

// How it works CMS
router.use('/how-it-works-cms', howItWorksCmsRoutes);
router.use('/journey-steps', journeyStepRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/workshop-materials', workshopMaterialRoutes);

// Product
router.use('/product-cms', productCmsRoutes);
router.use('/product-styles', productStyleRoutes);
router.use('/product-trims', productTrimRoutes);
router.use('/product-sizes', productSizeRoutes);
router.use('/product-add-ons', productAddOnRoutes);
router.use('/products', productRoutes);

export default router;
