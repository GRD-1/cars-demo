import { Request } from 'express';
import { CarDto } from '../dto/car.dto';

export interface CreateCarRequestType extends Request {
  dto: CarDto
}
