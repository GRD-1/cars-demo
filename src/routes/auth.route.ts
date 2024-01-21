import express from 'express';
import { AuthController } from '../auth/auth.controller';
const router = express.Router();
const controller = new AuthController();

/**
 * @api {post} api/auth/register
 */
router.post('/register', (req, res) => {
  controller.register(req, res);
});

/**
 * @api {post} api/auth/login
 */
router.post('/login', (req, res) => {
  controller.login(req, res);
});

router.use((req, res) => {
  res.status(404).send('#404 invalid request');
});

export default router;
