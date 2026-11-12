import express from 'express';

import homeController from '../home/home.controller.js';
import aboutController from '../about/about.controller.js';

const router = express.Router();

router.use('/home', homeController.get);
router.get('/about', aboutController.get);

export default router;
