import express from 'express';
import ProductController, { FOLDER, MEDIA_FIELDS } from '../../controllers/product/product.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { createUploadMiddleware } from '../../middlewares/multer.middleware.js';

const router = express.Router();

const upload = createUploadMiddleware(
  FOLDER,
  MEDIA_FIELDS.map((name) => ({ name, maxCount: 1 })),
);

router.use(authMiddleware());

router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);
router.post('/', upload, ProductController.create);
router.put('/:id', upload, ProductController.update);
router.delete('/:id', ProductController.delete);

export default router;
