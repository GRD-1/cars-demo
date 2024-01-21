import { Request, Response } from 'express';
import serviceProvider from '../utils/service-provider.util';
import { CarService } from './car.service';
const carService = serviceProvider.getService(CarService);

export class CarController {
  async create(req: Request, res: Response): Promise<void> {
    const newCar = await carService.create();
    res.send(newCar);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const car = await carService.getById();
    res.send(car);
  }

  async getSelection(req: Request, res: Response): Promise<void> {
    const carSelection = await carService.getSelection();
    res.send(carSelection);
  }

  async update(req: Request, res: Response): Promise<void> {
    const updatedCar = await carService.update();
    res.send(updatedCar);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const carDeleted = await carService.delete();
    res.send(carDeleted);
  }
}
