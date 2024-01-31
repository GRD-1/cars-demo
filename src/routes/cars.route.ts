import express from 'express';
import { CarController } from '../car/car.controller';
import { ValidateTokenMiddleware } from '../middleware/validate-token.middleware';
import { NOT_FOUND } from '../constants/err.constant';
import { ValidateCarMiddleware } from '../middleware/validate-car.middleware';
import { AuthRequestInterface } from '../car/types/car-request.type';

const router = express.Router();
const controller = new CarController();
const tokenIsValid = new ValidateTokenMiddleware().tokenIsValid;
const carIsValid = new ValidateCarMiddleware().carIsValid;

/**
 * @api {post} api/cars
 */
router.post('/', tokenIsValid, carIsValid, (req: AuthRequestInterface, res, next) => {
  controller.create(req, res, next);
});

/**
 * @api {get} api/cars
 */
router.get('/', tokenIsValid, (req, res, next) => {
  controller.findSeveral(req, res, next);
});

/**
 * @api {get} api/cars/:id
 */
router.get('/:id', tokenIsValid, (req, res, next) => {
  controller.findOne(req, res, next);
});

/**
 * @api {put} api/cars/:id
 */
router.put('/:id', tokenIsValid, carIsValid, (req, res, next) => {
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
