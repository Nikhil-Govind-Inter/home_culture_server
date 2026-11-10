import express from 'express';
import BlogCategoryController from '../../controllers/blog/blogCategory.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware());

router.get('/', BlogCategoryController.getAll);
router.get('/active', BlogCategoryController.getActiveCategories);
router.get('/:id', BlogCategoryController.getById);
router.post('/', BlogCategoryController.create);
router.put('/:id', BlogCategoryController.update);
router.delete('/:id', BlogCategoryController.delete);

export default router;
