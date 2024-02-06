import { Request } from 'express';
import { UserDto } from '../dto/user.dto';

export interface AuthRequestType extends Request {
  dto: UserDto
}
