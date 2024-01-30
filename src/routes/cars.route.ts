import express from 'express';
import { CarController } from '../car/car.controller';
import { CheckTokenMiddleware } from '../middleware/check-token.middleware';
import { NOT_FOUND } from '../constants/err.constant';

const router = express.Router();
const controller = new CarController();
const tokenIsValid = new CheckTokenMiddleware().tokenIsValid;

/**
 * @api {post} api/cars
 */
router.post('/', tokenIsValid, (req, res, next) => {
  controller.create(req, res, next);
});

/**
 * @api {get} api/cars
 */
router.get('/', tokenIsValid, (req, res, next) => {
  controller.getSelection(req, res, next);
});

/**
 * @api {get} api/cars/:id
 */
router.get('/:id', tokenIsValid, (req, res, next) => {
  controller.getById(req, res, next);
});

/**
 * @api {put} api/cars/:id
 */
router.put('/:id', tokenIsValid, (req, res, next) => {
  controller.update(req, res, next);
});

/**
 * @api {delete} api/cars/:id
 */
router.delete('/:id', tokenIsValid, (req, res, next) => {
  controller.delete(req, res, next);
});

router.use((req, res) => {
  res.status(404).send(NOT_FOUND);
});

export default router;
