import express from 'express';
import PrivacyPolicyController, { FOLDER, MEDIA_FIELDS } from '../../controllers/privacyPolicy/privacyPolicy.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { createUploadMiddleware } from '../../middlewares/multer.middleware.js';

const router = express.Router();

const upload = createUploadMiddleware(
  FOLDER,
  MEDIA_FIELDS.map((name) => ({ name, maxCount: 1 })),
);

router.use(authMiddleware());
router.get('/', PrivacyPolicyController.get);
router.put('/', upload, PrivacyPolicyController.update);

export default router;
