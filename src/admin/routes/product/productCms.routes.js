import express from 'express';
import ProductCmsController, { FOLDER, MEDIA_FIELDS } from '../../controllers/product/productCms.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { createUploadMiddleware } from '../../middlewares/multer.middleware.js';

const router = express.Router();

const upload = createUploadMiddleware(
  FOLDER,
  MEDIA_FIELDS.map((name) => ({ name, maxCount: 1 })),
);

router.use(authMiddleware());
router.get('/', ProductCmsController.get);
router.put('/', upload, ProductCmsController.update);

export default router;
