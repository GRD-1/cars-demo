import express from 'express';
import authRoute from './auth.route';
import carsRoute from './cars.route';
import {BAD_REQUEST} from '../constants/err.constant';
const router = express.Router();

router.use('/auth', authRoute);
router.use('/cars', carsRoute);

router.use((req, res) => {
  res.status(400).send(BAD_REQUEST);
});

export default router;
