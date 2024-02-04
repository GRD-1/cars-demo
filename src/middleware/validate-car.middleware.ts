import { Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { CustomError } from '../types/custom-error.type';
import { UNPROCESSABLE_ENTITY } from '../constants/err.constant';
import { CarDto } from '../car/dto/car.dto';
import { CreateCarRequestType } from '../car/types/create-car-request.type';

export const validateCarData = async (req: CreateCarRequestType, res: Response, next: NextFunction): Promise<void> => {
  const carDto = new CarDto();
  Object.assign(carDto, req.body);
  const errors = await validate(carDto);
  if (errors.length > 0) {
    const customErr = new CustomError(422, `${UNPROCESSABLE_ENTITY}: ${errors[0]}`);
    next(customErr);
    return;
  }
  req.dto = carDto;
  next();
};
