import express from 'express';
import CareerBenefitController from '../../controllers/careerCms/careerBenefit.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { createUploadMiddleware, SVG_UPLOAD } from '../../middlewares/multer.middleware.js';

const router = express.Router();

const upload = createUploadMiddleware('career-benefits', [{ name: 'media_path', maxCount: 1 }], SVG_UPLOAD);

router.use(authMiddleware());

router.get('/', CareerBenefitController.getAll);
router.get('/:id', CareerBenefitController.getById);
router.post('/', upload, CareerBenefitController.create);
router.put('/:id', upload, CareerBenefitController.update);
router.delete('/:id', CareerBenefitController.delete);

export default router;
