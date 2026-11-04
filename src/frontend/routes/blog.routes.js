import express from 'express';
import BlogController from '../controllers/blog.controller.js';

const router = express.Router();

router.get('/', BlogController.list);
router.get('/:key', BlogController.getOne); // slug or id

export default router;
