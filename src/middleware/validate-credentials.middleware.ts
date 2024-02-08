import { Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { CustomError } from '../types/custom-error.type';
import { UserDto } from '../modules/user/dto/user.dto';
import { UserRequestType } from '../modules/user/types/user-request.type';
import { UNPROCESSABLE_ENTITY } from '../constants/err.constant';

export default async (req: UserRequestType, res: Response, next: NextFunction): Promise<void> => {
  const authDto = new UserDto();
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
