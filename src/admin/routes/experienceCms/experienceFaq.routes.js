import express from 'express';
import ExperienceFaqController from '../../controllers/experienceCms/experienceFaq.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware());

router.get('/', ExperienceFaqController.getAll);
router.get('/:id', ExperienceFaqController.getById);
router.post('/', ExperienceFaqController.create);
router.put('/:id', ExperienceFaqController.update);
router.delete('/:id', ExperienceFaqController.delete);

export default router;
