import express from 'express';
import BannerController from '../controllers/banner.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { createUploadMiddleware } from '../middlewares/multer.middleware.js';

const router = express.Router();

const uploadFields = [{ name: 'image', maxCount: 1 }];
const upload = createUploadMiddleware('banners', uploadFields);

router.use(authMiddleware(['admin']));
router.get('/', BannerController.getAll);
router.get('/:id', BannerController.getById);
router.post('/', upload, BannerController.create);
router.put('/:id', upload, BannerController.update);
router.delete('/:id', BannerController.delete);

export default router;
