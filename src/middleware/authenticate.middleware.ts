import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../types/custom-error.type';
import { UNAUTHORIZED } from '../constants/err.constant';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  console.log('\nauthenticate middleware');
  passport.authenticate('jwt', { session: false }, (err, user) => {
    console.log('passport.authenticate');
    if (err || !user) {
      console.log('passport.authenticate err');
      const customErr = new CustomError(401, `${UNAUTHORIZED}`);
      next(customErr);
      return;
    }
    console.log('passport.authenticate success');
    req.user = user;
  })(req, res, next);
  console.log('passport.authenticate quit');
  next();
};
