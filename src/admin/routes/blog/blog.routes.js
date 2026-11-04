import express from 'express';
import BlogController from '../../controllers/blog/blog.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { createUploadMiddleware } from '../../middlewares/multer.middleware.js';

const router = express.Router();

const uploadFields = [{ name: 'image', maxCount: 1 }];
const upload = createUploadMiddleware('blogs', uploadFields);

router.use(authMiddleware(['admin']));
router.get('/', BlogController.getAll);
router.get('/:id', BlogController.getById);
router.post('/', upload, BlogController.create);
router.put('/:id', upload, BlogController.update);
router.delete('/:id', BlogController.delete);

export default router;
