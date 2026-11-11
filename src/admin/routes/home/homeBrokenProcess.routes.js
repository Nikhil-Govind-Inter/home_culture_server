import express from 'express';
import HomeBrokenProcessController, { FOLDER, MEDIA_FIELDS } from '../../controllers/home/homeBrokenProcess.controller.js';
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

router.get('/', HomeBrokenProcessController.getAll);
router.get('/:id', HomeBrokenProcessController.getById);
router.post('/', upload, HomeBrokenProcessController.create);
router.put('/:id', upload, HomeBrokenProcessController.update);
router.delete('/:id', HomeBrokenProcessController.delete);

export default router;
