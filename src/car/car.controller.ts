import { NextFunction, Request, Response } from 'express';
import serviceProvider from '../utils/service-provider.util';
import { CarService } from './car.service';
const carService = serviceProvider.getService(CarService);

export class CarController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newCar = await carService.create();
      res.send(newCar);
    } catch (e) {
      next(e);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log('controller');
    try {
      const car = await carService.getById();
      res.send(car);
    } catch (e) {
      console.log('controller catch');
      next(e);
    }
  }

  async getSelection(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const carSelection = await carService.getSelection();
      res.send(carSelection);
    } catch (e) {
      next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updatedCar = await carService.update();
      res.send(updatedCar);
    } catch (e) {
      next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const carDeleted = await carService.delete();
      res.send(carDeleted);
    } catch (e) {
      next(e);
    }
  }
}
