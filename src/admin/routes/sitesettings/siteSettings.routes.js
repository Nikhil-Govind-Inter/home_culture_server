import express from 'express';
import SiteSettingsController from '../../controllers/sitesettings/siteSettings.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { createUploadMiddleware } from '../../middlewares/multer.middleware.js';

const router = express.Router();

const upload = createUploadMiddleware('site-settings', [
  { name: 'header_logo', maxCount: 1 },
  { name: 'footer_logo', maxCount: 1 },
]);

router.use(authMiddleware());
router.get('/', SiteSettingsController.get);
router.put('/', upload, SiteSettingsController.update);

export default router;
