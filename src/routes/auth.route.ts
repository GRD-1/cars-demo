import express from 'express';
import { AuthController } from '../auth/auth.controller';
import { ValidateCredentialsMiddleware } from '../middleware/validate-credentials.middleware';
import { AuthRequestInterface } from '../auth/types/auth-request.type';
import { NOT_FOUND } from '../constants/err.constant';

const router = express.Router();
const controller = new AuthController();
const credentialsAreValid = new ValidateCredentialsMiddleware().credentialsAreValid;

/**
 * @api {post} api/auth/register
 */
router.post('/register', credentialsAreValid, (req: AuthRequestInterface, res, next) => {
  try {
    controller.register(req, res, next);
  } catch (err) {
    next(err);
  }
});

/**
 * @api {post} api/auth/login
 */
router.post('/login', credentialsAreValid, (req: AuthRequestInterface, res, next) => {
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
