import { Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { CustomError } from '../types/custom-error.type';
import { AuthDto } from '../auth/dto/auth.dto';
import { AuthRequestInterface } from '../auth/types/auth-request.type';
import { UNPROCESSABLE_ENTITY } from '../constants/err.constant';

export const validateCredentials = async (req: AuthRequestInterface, res: Response, next: NextFunction): Promise<void> => {
  const authDto = new AuthDto();
  Object.assign(authDto, req.body);
  const errors = await validate(authDto);
  if (errors.length > 0) {
    const customErr = new CustomError(422, `${UNPROCESSABLE_ENTITY}: ${errors[0]}`);
    next(customErr);
    return;
  }
  req.dto = authDto;
  next();
};
