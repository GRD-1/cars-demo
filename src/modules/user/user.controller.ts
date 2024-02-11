import { NextFunction, Response } from 'express';
import serviceProvider from '../../services/service-provider.service';
import { UserRequestType } from './types/user-request.type';
import { UserService } from './user.service';
import { UserRefreshType } from './types/user-refresh.type';
const userService = serviceProvider.getService(UserService);

export class UserController {
  async register(req: UserRequestType, res: Response, next: NextFunction): Promise<void> {
    try {
      const newUser = await userService.register(req.dto);
      res.status(201).send(newUser);
    } catch (e) {
      next(e);
    }
  }

  async login(req: UserRequestType, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await userService.login(req.dto);
      res.status(200).send(user);
    } catch (e) {
      next(e);
    }
  }

  async replaceTokens(req: UserRefreshType, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await userService.replaceTokens(req.userId, req.body.refreshToken);
      res.status(200).send(user);
    } catch (e) {
      next(e);
    }
  }
}
