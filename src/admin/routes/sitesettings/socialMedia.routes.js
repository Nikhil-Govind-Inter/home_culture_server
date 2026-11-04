import express from 'express';
import SocialMediaController from '../../controllers/sitesettings/socialMedia.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { createUploadMiddleware } from '../../middlewares/multer.middleware.js';

const router = express.Router();

const uploadFields = [{ name: 'icon_media_path', maxCount: 1 }];
const upload = createUploadMiddleware('social-media', uploadFields);

router.use(authMiddleware());

router.get('/', SocialMediaController.getAll);
router.get('/:id', SocialMediaController.getById);
router.post('/', upload, SocialMediaController.create);
router.put('/:id', upload, SocialMediaController.update);
router.delete('/:id', SocialMediaController.delete);

export default router;
