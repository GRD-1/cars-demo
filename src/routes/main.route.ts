import express from 'express';
import userRoute from './user.route';
import carsRoute from './cars.route';
import { NOT_FOUND } from '../constants/err.constant';
const router = express.Router();

router.use('/user', userRoute);
router.use('/cars', carsRoute);

router.use((req, res) => {
  res.status(404).send(NOT_FOUND);
});

export default router;
