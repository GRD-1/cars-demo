import { Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { CustomError } from '../types/custom-error.type';
import { INVALID_QUERY_PARAM, INVALID_QUERY_TYPE } from '../constants/err.constant';
import { CarSelectionDto } from '../car/dto/car-selection.dto';
import { SelectCarRequestType } from '../car/types/select-car-request.type';
import { SelectCarDefaultType } from '../car/types/select-car-default.type';

class ValidateCarQuery {
  static async validate(req: SelectCarRequestType, res: Response, next: NextFunction): Promise<void> {
    const carSelectionDto = new CarSelectionDto();
    const keyErrors = ValidateCarQuery.getKeyErrors(req.query);
    if (keyErrors.length > 0) {
      const customErr = new CustomError(422, `${INVALID_QUERY_PARAM}: invalid key: ${keyErrors[0]}`);
      next(customErr);
      return;
    }
    const typeErrors = await validate(carSelectionDto);
    if (typeErrors.length > 0) {
      const wrongProperty = ValidateCarQuery.getWrongProperty(typeErrors[0].toString(), req.query);
      const customErr = new CustomError(422, `${INVALID_QUERY_TYPE}: ${wrongProperty}`);
      next(customErr);
      return;
    }
    req.dto = Object.assign(carSelectionDto, req.query);
    next();
  }

  static getKeyErrors(query: {[key: string]: unknown}): string[] {
    const dtoKeys = Object.keys(new SelectCarDefaultType());
    return Object.keys(query).filter((key) => !dtoKeys.includes(key));
  }

  static getWrongProperty(input: string, query: {[key: string]: unknown}): string | null {
    const match = input.match(/\bproperty\b\s+(\w+)/i);
    if (match && match[1]) {
      const WrongValue = query[match[1]];
      return `${match[1]} = ${WrongValue}`;
    }
    return null;
  }
}
export default ValidateCarQuery.validate;
