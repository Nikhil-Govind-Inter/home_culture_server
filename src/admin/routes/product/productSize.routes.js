import express from 'express';
import ProductSizeController, { FOLDER, MEDIA_FIELDS } from '../../controllers/product/productSize.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { createUploadMiddleware } from '../../middlewares/multer.middleware.js';

const router = express.Router();

const upload = createUploadMiddleware(
  FOLDER,
  MEDIA_FIELDS.map((name) => ({ name, maxCount: 1 })),
);

router.use(authMiddleware());

router.get('/', ProductSizeController.getAll);
router.get('/active', ProductSizeController.getActive);
router.get('/:id', ProductSizeController.getById);
router.post('/', upload, ProductSizeController.create);
router.put('/:id', upload, ProductSizeController.update);
router.delete('/:id', ProductSizeController.delete);

export default router;
