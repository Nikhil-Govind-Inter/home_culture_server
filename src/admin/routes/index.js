import express from 'express';
import authRoutes from './auth/auth.routes.js';
import bannerRoutes from './sitesettings/banner.routes.js';
import blogRoutes from './blog/blog.routes.js';
import contactCmsRoutes from './contactCms/contactCms.routes.js';
import metaDataRoutes from './sitesettings/metaData.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/banners', bannerRoutes);
router.use('/blogs', blogRoutes);
router.use('/contact-cms', contactCmsRoutes);
router.use('/meta-data', metaDataRoutes);

export default router;
