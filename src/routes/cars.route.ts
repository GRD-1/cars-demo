import express from 'express';
import { CarController } from '../car/car.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';

const router = express.Router();
const controller = new CarController();
const checkToken = new AuthMiddleware().checkToken;

/**
 * @api {post} api/cars
 */
router.post('/', checkToken, (req, res) => {
  controller.create(req, res);
});

/**
 * @api {get} api/cars
 */
router.get('/', checkToken, (req, res) => {
  controller.getSelection(req, res);
});

/**
 * @api {get} api/cars/:id
 */
router.get('/:id', checkToken, (req, res) => {
  controller.getById(req, res);
});

/**
 * @api {put} api/cars/:id
 */
router.put('/:id', checkToken, (req, res) => {
  controller.update(req, res);
});

/**
 * @api {delete} api/cars/:id
 */
router.delete('/:id', checkToken, (req, res) => {
  controller.delete(req, res);
});

router.use((req, res) => {
  res.status(404).send('#404 invalid request');
});

export default router;
