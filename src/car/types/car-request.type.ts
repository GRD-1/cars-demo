import { Request } from 'express';
import { CarDto } from '../dto/car.dto';

export interface AuthRequestInterface extends Request {
  dto: CarDto
}
