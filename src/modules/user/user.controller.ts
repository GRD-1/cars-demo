import { NextFunction, Response } from 'express';
import serviceProvider from '../../utils/service-provider.util';
import { AuthRequestType } from './types/auth-request.type';
import { UserService } from './user.service';
const userService = serviceProvider.getService(UserService);

export class UserController {
  async register(req: AuthRequestType, res: Response, next: NextFunction): Promise<void> {
    try {
      const newUser = await userService.register(req.dto);
      res.status(201).send(newUser);
    } catch (e) {
      next(e);
    }
  }

  async login(req: AuthRequestType, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await userService.login(req.dto);
      res.status(200).send(user);
    } catch (e) {
      next(e);
    }
  }
}
