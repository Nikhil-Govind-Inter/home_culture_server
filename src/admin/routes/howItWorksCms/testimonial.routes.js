import express from 'express';
import TestimonialController from '../../controllers/howItWorksCms/testimonial.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { createUploadMiddleware } from '../../middlewares/multer.middleware.js';

const router = express.Router();

const upload = createUploadMiddleware('testimonials', [{ name: 'media_path', maxCount: 1 }]);

router.use(authMiddleware());

router.get('/', TestimonialController.getAll);
router.get('/:id', TestimonialController.getById);
router.post('/', upload, TestimonialController.create);
router.put('/:id', upload, TestimonialController.update);
router.delete('/:id', TestimonialController.delete);

export default router;
