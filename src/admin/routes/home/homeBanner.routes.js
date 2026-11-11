import express from 'express';
import HomeBannerController, { FOLDER, MEDIA_FIELDS } from '../../controllers/home/homeBanner.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import {
  createUploadMiddleware,
  MEDIA_UPLOAD,
  MEDIA_MAX_FILE_SIZE,
} from '../../middlewares/multer.middleware.js';

const router = express.Router();

const upload = createUploadMiddleware(
  FOLDER,
  MEDIA_FIELDS.map((name) => ({ name, maxCount: 1 })),
  MEDIA_UPLOAD,
  MEDIA_MAX_FILE_SIZE,
);

router.use(authMiddleware());

router.get('/', HomeBannerController.getAll);
router.get('/:id', HomeBannerController.getById);
router.post('/', upload, HomeBannerController.create);
router.put('/:id', upload, HomeBannerController.update);
router.delete('/:id', HomeBannerController.delete);

export default router;
