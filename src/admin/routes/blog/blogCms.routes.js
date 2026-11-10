import express from 'express';
import BlogCmsController, { FOLDER, MEDIA_FIELDS } from '../../controllers/blog/blogCms.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { createUploadMiddleware } from '../../middlewares/multer.middleware.js';

const router = express.Router();

const upload = createUploadMiddleware(
  FOLDER,
  MEDIA_FIELDS.map((name) => ({ name, maxCount: 1 })),
);

router.use(authMiddleware());
router.get('/', BlogCmsController.get);
router.put('/', upload, BlogCmsController.update);

export default router;
