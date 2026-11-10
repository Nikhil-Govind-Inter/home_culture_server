import express from 'express';
import BookingProcessController from '../../controllers/experienceCms/bookingProcess.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware());

router.get('/', BookingProcessController.getAll);
router.get('/:id', BookingProcessController.getById);
router.post('/', BookingProcessController.create);
router.put('/:id', BookingProcessController.update);
router.delete('/:id', BookingProcessController.delete);

export default router;
