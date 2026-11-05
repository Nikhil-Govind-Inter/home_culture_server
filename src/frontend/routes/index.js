import express from 'express';
import contactCmsRoutes from './contactCms.routes.js';

const router = express.Router();

router.use('/contact-cms', contactCmsRoutes);

export default router;
