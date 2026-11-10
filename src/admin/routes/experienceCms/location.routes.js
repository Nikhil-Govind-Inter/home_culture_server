import express from 'express';
import LocationController from '../../controllers/experienceCms/location.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware());

router.get('/', LocationController.getAll);
router.get('/:id', LocationController.getById);
router.post('/', LocationController.create);
router.put('/:id', LocationController.update);
router.delete('/:id', LocationController.delete);

export default router;
