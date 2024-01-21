import { Request, Response } from 'express';
import serviceProvider from '../utils/service-provider.util';
import { AuthService } from './auth.service';
const authService = serviceProvider.getService(AuthService);

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    const newUser = await authService.register();
    res.send(newUser);
  }

  async login(req: Request, res: Response): Promise<void> {
    const user = await authService.login();
    res.send(user);
  }
}
