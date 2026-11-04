import express from 'express';
import BannerController from '../../controllers/sitesettings/banner.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { createUploadMiddleware } from '../../middlewares/multer.middleware.js';

const router = express.Router();

const uploadFields = [
  { name: 'banner_desktop_media_path', maxCount: 1 },
  { name: 'banner_mobile_media_path', maxCount: 1 },
];
const upload = createUploadMiddleware('banners', uploadFields);

router.use(authMiddleware(['admin']));
router.get('/', BannerController.getAll);
router.get('/:id', BannerController.getById);
router.put('/:id', upload, BannerController.update);

export default router;
