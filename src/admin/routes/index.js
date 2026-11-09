import express from 'express';
import aboutCmsRoutes from './aboutCms/aboutCms.routes.js';
import aboutHighlightRoutes from './aboutCms/aboutHighlight.routes.js';
import authRoutes from './auth/auth.routes.js';
import bannerRoutes from './sitesettings/banner.routes.js';
import blogRoutes from './blog/blog.routes.js';
import contactCmsRoutes from './contactCms/contactCms.routes.js';
import faqCmsRoutes from './faqCms/faqCms.routes.js';
import faqCategoryRoutes from './faqCms/faqCategory.routes.js';
import faqRoutes from './faqCms/faq.routes.js';
import howItWorksCmsRoutes from './howItWorksCms/howItWorksCms.routes.js';
import journeyStepRoutes from './howItWorksCms/journeyStep.routes.js';
import metaDataRoutes from './sitesettings/metaData.routes.js';
import siteSettingsRoutes from './sitesettings/siteSettings.routes.js';
import socialMediaRoutes from './sitesettings/socialMedia.routes.js';
import testimonialRoutes from './howItWorksCms/testimonial.routes.js';
import workshopMaterialRoutes from './howItWorksCms/workshopMaterial.routes.js';

const router = express.Router();

router.use('/about-cms', aboutCmsRoutes);
router.use('/about-highlights', aboutHighlightRoutes);
router.use('/auth', authRoutes);
router.use('/banners', bannerRoutes);
router.use('/blogs', blogRoutes);
router.use('/contact-cms', contactCmsRoutes);
router.use('/faq-cms', faqCmsRoutes);
router.use('/faq-categories', faqCategoryRoutes);
router.use('/faqs', faqRoutes);
router.use('/how-it-works-cms', howItWorksCmsRoutes);
router.use('/journey-steps', journeyStepRoutes);
router.use('/meta-data', metaDataRoutes);
router.use('/site-settings', siteSettingsRoutes);
router.use('/social-media', socialMediaRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/workshop-materials', workshopMaterialRoutes);

export default router;
