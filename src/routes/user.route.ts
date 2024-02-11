import express from 'express';
import { UserController } from '../modules/user/user.controller';
import validateCredentials from '../middleware/validate-credentials.middleware';
import { UserRequestType } from '../modules/user/types/user-request.type';
import { NOT_FOUND } from '../constants/err.constant';
import { UserRefreshType } from '../modules/user/types/user-refresh.type';
import { checkTokenRefresh } from '../middleware/check-token-refresh.middleware';

const router = express.Router();
const controller = new UserController();

/**
 * @api {post} api/user/register
 */
router.post('/register', validateCredentials, (req: UserRequestType, res, next) => {
  try {
    controller.register(req, res, next);
  } catch (err) {
    next(err);
  }
});

/**
 * @api {post} api/user/login
 */
router.post('/login', validateCredentials, (req: UserRequestType, res, next) => {
  try {
    controller.login(req, res, next);
  } catch (err) {
    next(err);
  }
});

/**
 * @api {post} api/user/refresh
 */
router.post('/refresh', checkTokenRefresh, (req: UserRefreshType, res, next) => {
  try {
    controller.replaceTokens(req, res, next);
  } catch (err) {
    next(err);
  }
});

router.use((req, res) => {
  res.status(404).send(NOT_FOUND);
});

export default router;
