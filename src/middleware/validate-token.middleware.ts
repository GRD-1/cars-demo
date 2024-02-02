import { Request, Response, NextFunction, request } from 'express';

export const validateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    //...do something
    next();
  } catch (e) {
    throw e('Invalid token!');
  }
};
