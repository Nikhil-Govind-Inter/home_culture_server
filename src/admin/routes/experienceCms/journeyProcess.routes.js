import express from 'express';
import JourneyProcessController from '../../controllers/experienceCms/journeyProcess.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware());

router.get('/', JourneyProcessController.getAll);
router.get('/:id', JourneyProcessController.getById);
router.post('/', JourneyProcessController.create);
router.put('/:id', JourneyProcessController.update);
router.delete('/:id', JourneyProcessController.delete);

export default router;
