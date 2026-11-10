import express from 'express';

// Contact CMS
import contactCmsRoutes from './contactCms.routes.js';

const router = express.Router();

// Contact CMS
router.use('/contact-cms', contactCmsRoutes);

export default router;
