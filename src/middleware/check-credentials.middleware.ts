import { Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { AuthDto } from '../auth/dto/auth.dto';
import { AuthRequestInterface } from '../auth/types/auth-request.type';

export class CheckCredentialsMiddleware {
  async credentialsAreValid(req: AuthRequestInterface, res: Response, next: NextFunction): Promise<void> {
    const authDto = new AuthDto();
    Object.assign(authDto, req.body);
    req.authDto = authDto;
    const errors = await validate(authDto);
    if (errors.length > 0) {
      throw new Error();
    }
    req.authDto = null;
    next();
  }
}
