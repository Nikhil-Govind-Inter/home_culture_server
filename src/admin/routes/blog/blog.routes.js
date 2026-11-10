import express from 'express';
import BlogController, { FOLDER, MEDIA_FIELDS } from '../../controllers/blog/blog.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { createUploadMiddleware } from '../../middlewares/multer.middleware.js';

const router = express.Router();

const upload = createUploadMiddleware(
  FOLDER,
  MEDIA_FIELDS.map((name) => ({ name, maxCount: 1 })),
);

router.use(authMiddleware());
router.get('/', BlogController.getAll);
router.get('/:id', BlogController.getById);
router.post('/', upload, BlogController.create);
router.put('/:id', upload, BlogController.update);
router.delete('/:id', BlogController.delete);

export default router;
