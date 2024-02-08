import express from 'express';
import { UserController } from '../modules/user/user.controller';
import validateCredentials from '../middleware/validate-credentials.middleware';
import { UserRequestType } from '../modules/user/types/user-request.type';
import { NOT_FOUND } from '../constants/err.constant';

const router = express.Router();
const controller = new UserController();
router.use(validateCredentials);

/**
 * @api {post} api/user/register
 */
router.post('/register', (req: UserRequestType, res, next) => {
  try {
    controller.register(req, res, next);
  } catch (err) {
    next(err);
  }
});

/**
 * @api {post} api/user/login
 */
router.post('/login', (req: UserRequestType, res, next) => {
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
