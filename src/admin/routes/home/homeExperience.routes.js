import express from 'express';
import HomeExperienceController, { FOLDER, MEDIA_FIELDS } from '../../controllers/home/homeExperience.controller.js';
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

router.get('/', HomeExperienceController.getAll);
router.get('/:id', HomeExperienceController.getById);
router.post('/', upload, HomeExperienceController.create);
router.put('/:id', upload, HomeExperienceController.update);
router.delete('/:id', HomeExperienceController.delete);

export default router;
