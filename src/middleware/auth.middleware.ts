import { Request, Response, NextFunction, request } from 'express';

export class AuthMiddleware {
  async checkToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      //...do something
      next();
    } catch (e) {
      throw e('Invalid token!');
    }
  }
}
