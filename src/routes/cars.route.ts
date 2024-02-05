import express from 'express';
import { CarController } from '../car/car.controller';
import { validateToken } from '../middleware/validate-token.middleware';
import { validateCarData } from '../middleware/validate-car.middleware';
import { validateId } from '../middleware/validate-id.middleware';
import { NOT_FOUND } from '../constants/err.constant';
import { CreateCarRequestType } from '../car/types/create-car-request.type';
import validateQuery from '../middleware/validate-car-query.middleware';

const router = express.Router();
const controller = new CarController();

/**
 * @api {post} api/cars
 */
router.post('/', validateToken, validateCarData, (req: CreateCarRequestType, res, next) => {
  controller.create(req, res, next);
});

/**
 * @api {get} api/cars
 */
router.get('/', validateToken, validateQuery, (req: CreateCarRequestType, res, next) => {
  controller.findSeveral(req, res, next);
});

/**
 * @api {get} api/cars/:id
 */
router.get('/:id', validateToken, validateId, (req, res, next) => {
  console.log('\nrouter req.params', req.params);
  controller.findById(req, res, next);
});

/**
 * @api {put} api/cars/:id
 */
router.put('/:id', validateToken, validateId, validateCarData, (req: CreateCarRequestType, res, next) => {
  controller.update(req, res, next);
});

/**
 * @api {delete} api/cars/:id
 */
router.delete('/:id', validateToken, validateId, (req, res, next) => {
  controller.delete(req, res, next);
});

router.use((req, res) => {
  res.status(404).send(NOT_FOUND);
});

export default router;
