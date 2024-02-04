import { Request, Response, NextFunction } from 'express';
import { MongoServerError } from 'mongodb';
import { CustomError } from '../types/custom-error.type';
import {
  UNKNOWN_DB_ERROR,
  DUPLICATE_KEY_ERROR,
  INTERNAL_SERVER_ERROR,
} from '../constants/err.constant';

export const handleErrors = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  let code = 500;
  let msg = INTERNAL_SERVER_ERROR;
  let body = { error: msg };
  if (err instanceof CustomError) {
    code = err.code;
    body = { error: err.message };
  } else if (err instanceof MongoServerError) {
    switch (err.code) {
      case 11000:
        code = 409;
        msg = err.message.substring(err.message.search(/key: {.+/));
        body = { error: `${DUPLICATE_KEY_ERROR}: ${msg}` };
        break;
      default:
        code = 503;
        body = { error: UNKNOWN_DB_ERROR };
    }
  }
  res.status(code).json(body);
  console.log('\nerrorHandler', err);
};
