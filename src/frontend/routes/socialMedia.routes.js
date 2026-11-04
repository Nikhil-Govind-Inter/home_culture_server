import express from 'express';
import SocialMediaController from '../controllers/socialMedia.controller.js';

const router = express.Router();

router.get('/', SocialMediaController.list);

export default router;
