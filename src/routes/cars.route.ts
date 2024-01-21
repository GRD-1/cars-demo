import express from 'express';
import { CarController } from '../car/car.controller';
import { CheckTokenMiddleware } from '../middleware/check-token.middleware';

const router = express.Router();
const controller = new CarController();
const tokenIsValid = new CheckTokenMiddleware().tokenIsValid;

/**
 * @api {post} api/cars
 */
router.post('/', tokenIsValid, (req, res) => {
  controller.create(req, res);
});

/**
 * @api {get} api/cars
 */
router.get('/', tokenIsValid, (req, res) => {
  controller.getSelection(req, res);
});

/**
 * @api {get} api/cars/:id
 */
router.get('/:id', tokenIsValid, (req, res) => {
  controller.getById(req, res);
});

/**
 * @api {put} api/cars/:id
 */
router.put('/:id', tokenIsValid, (req, res) => {
  controller.update(req, res);
});

/**
 * @api {delete} api/cars/:id
 */
router.delete('/:id', tokenIsValid, (req, res) => {
  controller.delete(req, res);
});

router.use((req, res) => {
  res.status(404).send('#404 invalid request');
});

export default router;
