import { Request } from 'express';
import { AuthDto } from '../dto/auth.dto';

export interface AuthRequestType extends Request {
  dto: AuthDto | null
}
