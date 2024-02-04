import { NextFunction, Request, Response } from 'express';
import serviceProvider from '../utils/service-provider.util';
import { CarService } from './car.service';
import { CreateCarRequestType } from './types/create-car-request.type';
import { SelectCarRequestType } from './types/select-car-request.type';
const carService = serviceProvider.getService(CarService);

export class CarController {
  async create(req: CreateCarRequestType, res: Response, next: NextFunction): Promise<void> {
    try {
      const newCar = await carService.create(req.dto);
      res.status(201).send(newCar);
    } catch (e) {
      next(e);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const car = await carService.findById(req.params.id);
      res.status(200).send(car);
    } catch (e) {
      next(e);
    }
  }

  async findSeveral(req: SelectCarRequestType, res: Response, next: NextFunction): Promise<void> {
    try {
      const carSelection = await carService.findSeveral(req.dto);
      res.status(200).send(carSelection);
    } catch (e) {
      next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updatedCar = await carService.update();
      res.status(200).send(updatedCar);
    } catch (e) {
      next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const carDeleted = await carService.delete();
      res.status(200).send(carDeleted);
    } catch (e) {
      next(e);
    }
  }
}
