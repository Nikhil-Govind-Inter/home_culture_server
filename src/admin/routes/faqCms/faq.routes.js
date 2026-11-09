import express from 'express';
import FaqController from '../../controllers/faqCms/faq.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware());

router.get('/', FaqController.getAll);
router.get('/:id', FaqController.getById);
router.post('/', FaqController.create);
router.put('/:id', FaqController.update);
router.delete('/:id', FaqController.delete);

export default router;
