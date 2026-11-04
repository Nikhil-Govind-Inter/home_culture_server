import express from 'express';
import ContactCmsController from '../../controllers/contactCms/contactCms.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware());
router.get('/', ContactCmsController.get);
router.put('/', ContactCmsController.update);

export default router;
