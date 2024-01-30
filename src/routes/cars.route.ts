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
  try {
    controller.create(req, res);
  } catch (err) {
    next(err);
  }
});

/**
 * @api {get} api/cars
 */
router.get('/', tokenIsValid, (req, res, next) => {
  try {
    controller.getSelection(req, res);
  } catch (err) {
    next(err);
  }
});

/**
 * @api {get} api/cars/:id
 */
router.get('/:id', tokenIsValid, (req, res, next) => {
  try {
    controller.getById(req, res, next);
  } catch (err) {
    next(err);
  }
});

/**
 * @api {put} api/cars/:id
 */
router.put('/:id', tokenIsValid, (req, res, next) => {
  try {
    controller.update(req, res);
  } catch (err) {
    next(err);
  }
});

/**
 * @api {delete} api/cars/:id
 */
router.delete('/:id', tokenIsValid, (req, res, next) => {
  try {
    controller.delete(req, res);
  } catch (err) {
    next(err);
  }
});

router.use((req, res) => {
  res.status(404).send(NOT_FOUND);
});

export default router;
