import { Request } from 'express';
import { UserDto } from '../dto/user.dto';

export interface UserRequestType extends Request {
  dto: UserDto
}
