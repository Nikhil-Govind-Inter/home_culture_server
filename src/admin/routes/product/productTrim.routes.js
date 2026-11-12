import express from 'express';
import ProductTrimController, { FOLDER, MEDIA_FIELDS } from '../../controllers/product/productTrim.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { createUploadMiddleware } from '../../middlewares/multer.middleware.js';

const router = express.Router();

const upload = createUploadMiddleware(
  FOLDER,
  MEDIA_FIELDS.map((name) => ({ name, maxCount: 1 })),
);

router.use(authMiddleware());

router.get('/', ProductTrimController.getAll);
router.get('/active', ProductTrimController.getActive);
router.get('/:id', ProductTrimController.getById);
router.post('/', upload, ProductTrimController.create);
router.put('/:id', upload, ProductTrimController.update);
router.delete('/:id', ProductTrimController.delete);

export default router;
