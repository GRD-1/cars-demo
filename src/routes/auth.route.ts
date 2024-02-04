import express from 'express';
import { AuthController } from '../auth/auth.controller';
import validateCredentials from '../middleware/validate-credentials.middleware';
import { AuthRequestType } from '../auth/types/auth-request.type';
import { NOT_FOUND } from '../constants/err.constant';

const router = express.Router();
const controller = new AuthController();

/**
 * @api {post} api/auth/register
 */
router.post('/register', validateCredentials, (req: AuthRequestType, res, next) => {
  try {
    controller.register(req, res, next);
  } catch (err) {
    next(err);
  }
});

/**
 * @api {post} api/auth/login
 */
router.post('/login', validateCredentials, (req: AuthRequestType, res, next) => {
  try {
    controller.login(req, res, next);
  } catch (err) {
    next(err);
  }
});

router.use((req, res) => {
  res.status(404).send(NOT_FOUND);
});

export default router;
