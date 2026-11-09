import express from 'express';
import FaqCategoryController from '../../controllers/faqCms/faqCategory.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware());

router.get('/', FaqCategoryController.getAll);
router.get('/active', FaqCategoryController.getActiveCategories);
router.get('/:id', FaqCategoryController.getById);
router.post('/', FaqCategoryController.create);
router.put('/:id', FaqCategoryController.update);
router.delete('/:id', FaqCategoryController.delete);

export default router;
