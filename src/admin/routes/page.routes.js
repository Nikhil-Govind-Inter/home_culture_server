import express from 'express';
import PageController from '../controllers/page.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware(['admin']));
router.get('/', PageController.getAll);
router.get('/:id', PageController.getById);
router.post('/', PageController.create);
router.put('/:id', PageController.update);
router.delete('/:id', PageController.delete);

export default router;
