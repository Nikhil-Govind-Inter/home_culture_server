import express from 'express';
import ExperienceTimelineController from '../../controllers/experienceCms/experienceTimeline.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { createUploadMiddleware } from '../../middlewares/multer.middleware.js';

const router = express.Router();

const upload = createUploadMiddleware('experience-timeline', [{ name: 'media_path', maxCount: 1 }]);

router.use(authMiddleware());

router.get('/', ExperienceTimelineController.getAll);
router.get('/:id', ExperienceTimelineController.getById);
router.post('/', upload, ExperienceTimelineController.create);
router.put('/:id', upload, ExperienceTimelineController.update);
router.delete('/:id', ExperienceTimelineController.delete);

export default router;
