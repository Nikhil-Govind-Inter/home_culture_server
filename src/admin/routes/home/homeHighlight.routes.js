import express from 'express';
import HomeHighlightController, { FOLDER, MEDIA_FIELDS } from '../../controllers/home/homeHighlight.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { createUploadMiddleware } from '../../middlewares/multer.middleware.js';

const router = express.Router();

const upload = createUploadMiddleware(FOLDER, MEDIA_FIELDS.map((name) => ({ name, maxCount: 1 })));

router.use(authMiddleware());

router.get('/', HomeHighlightController.getAll);
router.get('/:id', HomeHighlightController.getById);
router.post('/', upload, HomeHighlightController.create);
router.put('/:id', upload, HomeHighlightController.update);
router.delete('/:id', HomeHighlightController.delete);

export default router;
