import express from 'express';
import WorkshopMaterialController from '../../controllers/howItWorksCms/workshopMaterial.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { createUploadMiddleware } from '../../middlewares/multer.middleware.js';

const router = express.Router();

const upload = createUploadMiddleware('workshop-materials', [{ name: 'media_path', maxCount: 1 }]);

router.use(authMiddleware());

router.get('/', WorkshopMaterialController.getAll);
router.get('/:id', WorkshopMaterialController.getById);
router.post('/', upload, WorkshopMaterialController.create);
router.put('/:id', upload, WorkshopMaterialController.update);
router.delete('/:id', WorkshopMaterialController.delete);

export default router;
