import express from 'express';
import ExperienceCmsController, { FOLDER, MEDIA_FIELDS } from '../../controllers/experienceCms/experienceCms.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import {
  createUploadMiddleware,
  MEDIA_UPLOAD,
  MEDIA_MAX_FILE_SIZE,
} from '../../middlewares/multer.middleware.js';

const router = express.Router();

// The visit section media may be an image or a video; allow larger files.
const upload = createUploadMiddleware(
  FOLDER,
  MEDIA_FIELDS.map((name) => ({ name, maxCount: 1 })),
  MEDIA_UPLOAD,
  MEDIA_MAX_FILE_SIZE,
);

router.use(authMiddleware());
router.get('/', ExperienceCmsController.get);
router.put('/', upload, ExperienceCmsController.update);

export default router;
