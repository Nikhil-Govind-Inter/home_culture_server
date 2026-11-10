import express from 'express';
import ExperienceHighlightController from '../../controllers/experienceCms/experienceHighlight.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware());

router.get('/', ExperienceHighlightController.getAll);
router.get('/:id', ExperienceHighlightController.getById);
router.post('/', ExperienceHighlightController.create);
router.put('/:id', ExperienceHighlightController.update);
router.delete('/:id', ExperienceHighlightController.delete);

export default router;
