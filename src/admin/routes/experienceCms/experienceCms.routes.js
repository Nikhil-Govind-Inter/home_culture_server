import express from 'express';
import ExperienceCmsController, { FOLDER, MEDIA_FIELDS } from '../../controllers/experienceCms/experienceCms.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { createUploadMiddleware } from '../../middlewares/multer.middleware.js';

const router = express.Router();

const upload = createUploadMiddleware(
  FOLDER,
  MEDIA_FIELDS.map((name) => ({ name, maxCount: 1 })),
);

router.use(authMiddleware());
router.get('/', ExperienceCmsController.get);
router.put('/', upload, ExperienceCmsController.update);

export default router;
