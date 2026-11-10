import express from 'express';
import CareerVisionController from '../../controllers/careerCms/careerVision.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware());

router.get('/', CareerVisionController.getAll);
router.get('/:id', CareerVisionController.getById);
router.post('/', CareerVisionController.create);
router.put('/:id', CareerVisionController.update);
router.delete('/:id', CareerVisionController.delete);

export default router;
