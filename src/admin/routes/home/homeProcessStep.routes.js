import express from 'express';
import HomeProcessStepController from '../../controllers/home/homeProcessStep.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware());

router.get('/', HomeProcessStepController.getAll);
router.get('/:id', HomeProcessStepController.getById);
router.post('/', HomeProcessStepController.create);
router.put('/:id', HomeProcessStepController.update);
router.delete('/:id', HomeProcessStepController.delete);

export default router;
