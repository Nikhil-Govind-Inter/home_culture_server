import express from 'express';
import authRoutes from './auth/auth.routes.js';
import bannerRoutes from './sitesettings/banner.routes.js';
import blogRoutes from './blog/blog.routes.js';
import contactCmsRoutes from './contactCms/contactCms.routes.js';

const router = express.Router();

router.use('/auth', authRoutes); // login is public; each router below guards itself
router.use('/banners', bannerRoutes);
router.use('/blogs', blogRoutes);
router.use('/contact-cms', contactCmsRoutes);

export default router;
