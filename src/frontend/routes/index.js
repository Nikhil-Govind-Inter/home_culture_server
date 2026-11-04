import express from 'express';
import pageRoutes from './page.routes.js';
import bannerRoutes from './banner.routes.js';
import blogRoutes from './blog.routes.js';
import contactCmsRoutes from './contactCms.routes.js';

const router = express.Router();

router.use('/pages', pageRoutes);
router.use('/banners', bannerRoutes);
router.use('/blogs', blogRoutes);
router.use('/contact-cms', contactCmsRoutes);

export default router;
