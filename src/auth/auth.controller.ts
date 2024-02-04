import { NextFunction, Response } from 'express';
import serviceProvider from '../utils/service-provider.util';
import { AuthService } from './auth.service';
import { AuthRequestType } from './types/auth-request.type';
const authService = serviceProvider.getService(AuthService);

export class AuthController {
  async register(req: AuthRequestType, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.dto) {
        res.status(500).json('RAVOLY!!!');
        return;
      }
      const newUser = await authService.register(req.dto);
      res.status(200).json(newUser);
    } catch (e) {
      next(e);
    }
  }

  async login(req: AuthRequestType, res: Response, next: NextFunction): Promise<void> {
    try {
      if (req.dto) {
        const user = await authService.login();
        res.send(user);
      }
      res.status(200).json({ message: 'User registered successfully' });
    } catch (e) {
      next(e);
    }
  }
}
