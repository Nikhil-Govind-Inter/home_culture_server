import express from 'express';
import AboutCmsController, { FOLDER, MEDIA_FIELDS } from '../../controllers/aboutCms/aboutCms.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { createUploadMiddleware } from '../../middlewares/multer.middleware.js';

const router = express.Router();

const upload = createUploadMiddleware(
  FOLDER,
  MEDIA_FIELDS.map((name) => ({ name, maxCount: 1 })),
);

router.use(authMiddleware());
router.get('/', AboutCmsController.get);
router.put('/', upload, AboutCmsController.update);

export default router;
