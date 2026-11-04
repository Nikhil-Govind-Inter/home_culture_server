import express from 'express';
import AuthController from '../../controllers/auth/auth.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', AuthController.login); // public
router.get('/profile', authMiddleware(['admin']), AuthController.profile);

export default router;
