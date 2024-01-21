import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/custom-error';
import { INTERNAL_SERVER_ERROR } from '../constants/err.constant';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    console.error('An unexpected error occurred:', err);
    res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
};
