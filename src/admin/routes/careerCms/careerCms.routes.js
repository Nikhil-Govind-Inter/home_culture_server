import express from 'express';
import CareerCmsController, { FOLDER, MEDIA_FIELDS } from '../../controllers/careerCms/careerCms.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { createUploadMiddleware } from '../../middlewares/multer.middleware.js';

const router = express.Router();

const upload = createUploadMiddleware(
  FOLDER,
  MEDIA_FIELDS.map((name) => ({ name, maxCount: 1 })),
);

router.use(authMiddleware());
router.get('/', CareerCmsController.get);
router.put('/', upload, CareerCmsController.update);

export default router;
