import express from 'express';
import { CarController } from '../modules/car/car.controller';
import { validateCarData } from '../middleware/validate-car.middleware';
import { validateId } from '../middleware/validate-id.middleware';
import { NOT_FOUND } from '../constants/err.constant';
import { CreateCarRequestType } from '../modules/car/types/create-car-request.type';
import validateQuery from '../middleware/validate-car-query.middleware';

const controller = new CarController();
const router = express.Router();
// router.use(authenticate);

/**
 * @api {post} api/cars
 */
router.post('/', validateCarData, (req: CreateCarRequestType, res, next) => {
  controller.create(req, res, next);
});

/**
 * @api {get} api/cars
 */
router.get('/', validateQuery, (req: CreateCarRequestType, res, next) => {
  controller.findSeveral(req, res, next);
});

/**
 * @api {get} api/cars/:id
 */
router.get('/:id', validateId, (req, res, next) => {
  controller.findById(req, res, next);
});

/**
 * @api {put} api/cars/:id
 */
router.put('/:id', validateId, validateCarData, (req: CreateCarRequestType, res, next) => {
  controller.update(req, res, next);
});

/**
 * @api {delete} api/cars/:id
 */
router.delete('/:id', validateId, (req, res, next) => {
  controller.delete(req, res, next);
});

router.use((req, res) => {
  res.status(404).send(NOT_FOUND);
});

export default router;
