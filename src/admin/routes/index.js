import express from 'express';
import authRoutes from './auth.routes.js';
import pageRoutes from './page.routes.js';
import bannerRoutes from './banner.routes.js';
import blogRoutes from './blog.routes.js';
import contactCmsRoutes from './contactCms.routes.js';

const router = express.Router();

router.use('/auth', authRoutes); // login is public; each router below guards itself
router.use('/pages', pageRoutes);
router.use('/banners', bannerRoutes);
router.use('/blogs', blogRoutes);
router.use('/contact-cms', contactCmsRoutes);

export default router;
