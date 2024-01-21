import { Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { AuthDto } from '../auth/dto/auth.dto';
import { AuthRequestInterface } from '../auth/types/auth-request.type';
import { CustomError } from '../utils/custom-error';
import { UNPROCESSABLE_ENTITY } from '../constants/err.constant';

export class CheckCredentialsMiddleware {
  async credentialsAreValid(req: AuthRequestInterface, res: Response, next: NextFunction): Promise<void> {
    const authDto = new AuthDto();
    Object.assign(authDto, req.body);
    req.authDto = authDto;
    const errors = await validate(authDto);
    if (errors.length > 0) {
      const customErr = new CustomError(`${UNPROCESSABLE_ENTITY}: ${errors[0]}`, 422);
      next(customErr);
    }
    req.authDto = null;
    next();
  }
}
