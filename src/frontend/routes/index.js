import express from 'express';
import bannerRoutes from './banner.routes.js';
import blogRoutes from './blog.routes.js';
import contactCmsRoutes from './contactCms.routes.js';
import socialMediaRoutes from './socialMedia.routes.js';

const router = express.Router();

router.use('/banners', bannerRoutes);
router.use('/blogs', blogRoutes);
router.use('/contact-cms', contactCmsRoutes);
router.use('/social-media', socialMediaRoutes);

export default router;
