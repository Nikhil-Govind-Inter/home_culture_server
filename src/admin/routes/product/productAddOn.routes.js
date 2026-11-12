import express from 'express';
import ProductAddOnController, { FOLDER, MEDIA_FIELDS } from '../../controllers/product/productAddOn.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { createUploadMiddleware } from '../../middlewares/multer.middleware.js';

const router = express.Router();

const upload = createUploadMiddleware(
  FOLDER,
  MEDIA_FIELDS.map((name) => ({ name, maxCount: 1 })),
);

router.use(authMiddleware());

router.get('/', ProductAddOnController.getAll);
router.get('/active', ProductAddOnController.getActive);
router.get('/:id', ProductAddOnController.getById);
router.post('/', upload, ProductAddOnController.create);
router.put('/:id', upload, ProductAddOnController.update);
router.delete('/:id', ProductAddOnController.delete);

export default router;
