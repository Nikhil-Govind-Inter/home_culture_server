import express from 'express';
import JourneyStepController from '../../controllers/howItWorksCms/journeyStep.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware());

router.get('/', JourneyStepController.getAll);
router.get('/:id', JourneyStepController.getById);
router.post('/', JourneyStepController.create);
router.put('/:id', JourneyStepController.update);
router.delete('/:id', JourneyStepController.delete);

export default router;
