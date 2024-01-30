import { NextFunction, Response } from 'express';
import serviceProvider from '../utils/service-provider.util';
import { AuthService } from './auth.service';
import { AuthRequestInterface } from './types/auth-request.type';
const authService = serviceProvider.getService(AuthService);

export class AuthController {
  async register(req: AuthRequestInterface, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.authDto) {
        console.log('AuthController req.authDto = ', req.authDto);
        res.status(500).json('RAVOLY!!!');
        return;
      }
      const newUser = await authService.register(req.authDto);
      res.status(200).json(newUser);
    } catch (e) {
      next(e);
    }
  }

  async login(req: AuthRequestInterface, res: Response, next: NextFunction): Promise<void> {
    try {
      if (req.authDto) {
        const user = await authService.login();
        res.send(user);
      }
      res.status(200).json({ message: 'User registered successfully' });
    } catch (e) {
      next(e);
    }
  }
}
