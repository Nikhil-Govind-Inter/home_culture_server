import express from 'express';
import StateController from '../../controllers/masters/state.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware());

router.get('/', StateController.getAll);
router.get('/active', StateController.getActive);
router.get('/:slug', StateController.getById);
router.post('/', StateController.create);
router.put('/:slug', StateController.update);
router.delete('/:slug', StateController.delete);

export default router;
