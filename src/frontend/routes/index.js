import express from 'express';

import homeController from '../home/home.controller.js';

const router = express.Router();

router.use('/home', homeController.get);

export default router;
