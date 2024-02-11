import { NextFunction, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { CustomError } from '../types/custom-error.type';
import { INVALID_JWT } from '../constants/err.constant';
import { UserRefreshType } from '../modules/user/types/user-refresh.type';

export const checkTokenRefresh = (req: UserRefreshType, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next(new CustomError(401, `${INVALID_JWT}`));
  const decodedPayload = jsonwebtoken.decode(token, { complete: true })?.payload;
  if (!decodedPayload || typeof decodedPayload !== 'object' || !decodedPayload._id) {
    return next(new CustomError(401, `${INVALID_JWT}`));
  }
  req.userId = decodedPayload._id;
  return next();
};
