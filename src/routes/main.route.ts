import express from 'express';
import authRoute from './auth.route';
import carsRoute from './cars.route';
const router = express.Router();

router.use('/auth', authRoute);
router.use('/cars', carsRoute);

router.use((req, res) => {
  res.status(404).send('#404 invalid request');
});

export default router;
