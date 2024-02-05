import { Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CustomError } from '../types/custom-error.type';
import { INVALID_QUERY_PARAM, INVALID_QUERY_TYPE } from '../constants/err.constant';
import { CarSelectionDto } from '../car/dto/car-selection.dto';
import { SelectCarRequestType } from '../car/types/select-car-request.type';
import { queryKeys, queryType } from '../car/types/request-query.type';

class CarQueryValidator {
  static async validateQuery(req: SelectCarRequestType, res: Response, next: NextFunction): Promise<void> {
    try {
      CarQueryValidator.throwKeyError(req.query);
      const carSelectionDto = plainToClass(CarSelectionDto, req.query);
      await CarQueryValidator.throwTypeError(carSelectionDto, req.query);
      req.dto = carSelectionDto;
      next();
    } catch (e) {
      next(e);
    }
  }

  static throwKeyError(query: queryType): void {
    const keyErrors = Object.keys(query).filter((key) => !queryKeys.includes(key));
    if (keyErrors.length > 0) {
      throw new CustomError(422, `${INVALID_QUERY_PARAM}: invalid key: ${keyErrors[0]}`);
    }
  }

  static async throwTypeError(dto: CarSelectionDto, query: queryType): Promise<void> {
    const typeErrors = await validate(dto);
    if (typeErrors.length > 0) {
      const wrongProperty = CarQueryValidator.getWrongProperty(typeErrors[0].toString(), query);
      throw new CustomError(422, `${INVALID_QUERY_TYPE}: ${wrongProperty}`);
    }
  }

  static getWrongProperty(input: string, query: queryType): string | null {
    const match = input.match(/\bproperty\b\s+(\w+)/i);
    if (match && match[1]) {
      const WrongValue = query[match[1]];
      return `${match[1]} = ${WrongValue}`;
    }
    return null;
  }
}
export default CarQueryValidator.validateQuery;
