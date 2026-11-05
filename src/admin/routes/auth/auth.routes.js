import express from 'express';
import AuthController from '../../controllers/auth/auth.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', AuthController.login); // public
router.post('/forgot-password', AuthController.forgotPassword); // public
router.post('/verify-otp', AuthController.verifyOtp); // public
router.post('/reset-password', AuthController.resetPassword); // public
router.get('/profile', authMiddleware(), AuthController.profile);

export default router;
