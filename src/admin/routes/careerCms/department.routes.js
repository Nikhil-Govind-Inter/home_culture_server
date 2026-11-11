import express from 'express';
import DepartmentController from '../../controllers/careerCms/department.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware());

router.get('/', DepartmentController.getAll);
router.get('/active', DepartmentController.getActive);
router.get('/:slug', DepartmentController.getById);
router.post('/', DepartmentController.create);
router.put('/:slug', DepartmentController.update);
router.delete('/:slug', DepartmentController.delete);

export default router;
