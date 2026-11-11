import express from 'express';
import CityController from '../../controllers/masters/city.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware());

router.get('/', CityController.getAll);
router.get('/active', CityController.getActive);
router.get('/:slug', CityController.getById);
router.post('/', CityController.create);
router.put('/:slug', CityController.update);
router.delete('/:slug', CityController.delete);

export default router;
