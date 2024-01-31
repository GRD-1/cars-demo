import { Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { CustomError } from '../errors/custom-error.type';
import { UNPROCESSABLE_ENTITY } from '../constants/err.constant';
import { CarDto } from '../car/dto/car.dto';
import { AuthRequestInterface } from '../car/types/car-request.type';

export class ValidateCarMiddleware {
  async carIsValid(req: AuthRequestInterface, res: Response, next: NextFunction): Promise<void> {
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
  }
}
