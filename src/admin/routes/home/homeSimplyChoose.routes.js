import express from 'express';
import HomeSimplyChooseController from '../../controllers/home/homeSimplyChoose.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware());

router.get('/', HomeSimplyChooseController.getAll);
router.get('/:id', HomeSimplyChooseController.getById);
router.post('/', HomeSimplyChooseController.create);
router.put('/:id', HomeSimplyChooseController.update);
router.delete('/:id', HomeSimplyChooseController.delete);

export default router;
