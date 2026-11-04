import express from 'express';
import PageController from '../controllers/page.controller.js';

const router = express.Router();

router.get('/', PageController.list);
router.get('/:key', PageController.getOne); // slug or id

export default router;
