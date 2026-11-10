import express from 'express';
import ExperienceFeatureController from '../../controllers/experienceCms/experienceFeature.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { createUploadMiddleware } from '../../middlewares/multer.middleware.js';

const router = express.Router();

const upload = createUploadMiddleware('experience-features', [{ name: 'media_path', maxCount: 1 }]);

router.use(authMiddleware());

router.get('/', ExperienceFeatureController.getAll);
router.get('/:id', ExperienceFeatureController.getById);
router.post('/', upload, ExperienceFeatureController.create);
router.put('/:id', upload, ExperienceFeatureController.update);
router.delete('/:id', ExperienceFeatureController.delete);

export default router;
