import { NextFunction, Response } from 'express';
import { CustomError } from '../types/custom-error.type';
import { INVALID_JWT } from '../constants/err.constant';
import { UserRequestType } from '../modules/user/types/user-request.type';
import passportService from '../services/passport.service';

export const checkToken = (req: UserRequestType, res: Response, next: NextFunction): void => {
  passportService.passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      const customErr = new CustomError(401, `${INVALID_JWT}`);
      return next(customErr);
    }
    if (!user) {
      const customErr = new CustomError(401, `${INVALID_JWT}`);
      return next(customErr);
    }
    req.dto = user;
    next();
  })(req, res, next);
};
