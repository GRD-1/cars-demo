import express from 'express';
import { AuthController } from '../auth/auth.controller';
import { CheckCredentialsMiddleware } from '../middleware/check-credentials.middleware';
import { AuthRequestInterface } from '../auth/types/auth-request.type';

const router = express.Router();
const controller = new AuthController();
const credentialsAreValid = new CheckCredentialsMiddleware().credentialsAreValid;

/**
 * @api {post} api/auth/register
 */
router.post('/register', credentialsAreValid, (req: AuthRequestInterface, res) => {
  controller.register(req, res);
});

/**
 * @api {post} api/auth/login
 */
router.post('/login', credentialsAreValid, (req, res) => {
  controller.login(req, res);
});

router.use((req, res) => {
  res.status(404).send('#404 invalid request');
});

export default router;
