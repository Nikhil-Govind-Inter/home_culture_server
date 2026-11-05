import express from 'express';
import AboutHighlightController, { FOLDER, MEDIA_FIELDS } from '../../controllers/aboutCms/aboutHighlight.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { createUploadMiddleware } from '../../middlewares/multer.middleware.js';

const router = express.Router();

const upload = createUploadMiddleware(
  FOLDER,
  MEDIA_FIELDS.map((name) => ({ name, maxCount: 1 })),
);

router.use(authMiddleware());

router.get('/', AboutHighlightController.getAll);
router.get('/:id', AboutHighlightController.getById);
router.post('/', upload, AboutHighlightController.create);
router.put('/:id', upload, AboutHighlightController.update);
router.delete('/:id', AboutHighlightController.delete);

export default router;
