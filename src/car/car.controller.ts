import { NextFunction, Request, Response } from 'express';
import serviceProvider from '../utils/service-provider.util';
import { CarService } from './car.service';
import { AuthRequestInterface } from './types/car-request.type';
const carService = serviceProvider.getService(CarService);

export class CarController {
  async create(req: AuthRequestInterface, res: Response, next: NextFunction): Promise<void> {
    try {
      const newCar = await carService.create(req.dto);
      res.status(201).send(newCar);
    } catch (e) {
      next(e);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log('controller req.params', req.params);
      const car = await carService.findById(req.params.id);
      res.status(200).send(car);
    } catch (e) {
      next(e);
    }
  }

  async findSeveral(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const carSelection = await carService.findSeveral();
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
