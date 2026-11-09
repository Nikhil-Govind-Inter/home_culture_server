import express from 'express';
import FaqCmsController, { FOLDER, MEDIA_FIELDS } from '../../controllers/faqCms/faqCms.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { createUploadMiddleware } from '../../middlewares/multer.middleware.js';

const router = express.Router();

const upload = createUploadMiddleware(
  FOLDER,
  MEDIA_FIELDS.map((name) => ({ name, maxCount: 1 })),
);

router.use(authMiddleware());

router.get('/', FaqCmsController.get);
router.put('/', upload, FaqCmsController.update);

export default router;
