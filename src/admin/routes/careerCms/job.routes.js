import express from 'express';
import JobController from '../../controllers/careerCms/job.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware());

router.get('/', JobController.getAll);
router.get('/active', JobController.getActive);
router.get('/:slug', JobController.getById);
router.post('/', JobController.create);
router.put('/:slug', JobController.update);
router.delete('/:slug', JobController.delete);

export default router;
