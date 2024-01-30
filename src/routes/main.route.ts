import express from 'express';
import authRoute from './auth.route';
import carsRoute from './cars.route';
import { NOT_FOUND } from '../constants/err.constant';
const router = express.Router();

router.use('/auth', authRoute);
router.use('/cars', carsRoute);

router.use((req, res) => {
  res.status(404).send(NOT_FOUND);
});

export default router;
