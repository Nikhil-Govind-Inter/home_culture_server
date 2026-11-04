import express from 'express';
import BannerController from '../controllers/banner.controller.js';

const router = express.Router();

router.get('/', BannerController.list);
router.get('/:key', BannerController.getOne); // slug or id

export default router;
