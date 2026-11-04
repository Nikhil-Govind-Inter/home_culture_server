import express from 'express';
import ContactCmsController from '../controllers/contactCms.controller.js';

const router = express.Router();

router.get('/', ContactCmsController.get);

export default router;
