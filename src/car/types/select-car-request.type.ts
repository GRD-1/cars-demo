import { Request } from 'express';
import { CarSelectionDto } from '../dto/car-selection.dto';

export interface SelectCarRequestType extends Request {
  dto: CarSelectionDto
}
