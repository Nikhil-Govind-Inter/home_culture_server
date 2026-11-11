import express from 'express';
import HomeCmsController, { FOLDER, MEDIA_FIELDS } from '../../controllers/home/homeCms.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import {
  createUploadMiddleware,
  MEDIA_UPLOAD,
  MEDIA_MAX_FILE_SIZE,
} from '../../middlewares/multer.middleware.js';

const router = express.Router();

// Desktop/mobile media may be images or videos; allow larger files.
const upload = createUploadMiddleware(
  FOLDER,
  MEDIA_FIELDS.map((name) => ({ name, maxCount: 1 })),
  MEDIA_UPLOAD,
  MEDIA_MAX_FILE_SIZE,
);

router.use(authMiddleware());
router.get('/', HomeCmsController.get);
router.put('/', upload, HomeCmsController.update);

export default router;
