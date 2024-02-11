import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../types/custom-error.type';
import { INVALID_JWT } from '../constants/err.constant';
import { UserRequestType } from '../modules/user/types/user-request.type';

export const checkToken = (req: UserRequestType, res: Response, next: NextFunction): void => {
  console.log('\nauthenticate middleware');
  passport.authenticate('jwt', { session: false }, (err, user) => {
    console.log('passport.authenticate');
    if (err || !user) {
      console.log('passport.authenticate err');
      const customErr = new CustomError(401, `${INVALID_JWT}`);
      next(customErr);
      return;
    }
    console.log('passport.authenticate success');
    req.dto = user;
  })(req, res, next);
  console.log('passport.authenticate quit');
  next();
};
