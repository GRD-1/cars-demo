import connector from '../utils/mongo-connector.util';
import { CarDto } from './dto/car.dto';
import { CarDocument, CarModel } from './models/car.model';

export class CarService {
  async create(dto: CarDto): Promise<CarDocument | null> {
    const newCar = new CarModel(dto);
    await connector.connect();
    const carDocument = await newCar.save();
    // await connector.closeConnection();
    return carDocument;
  }

  async findOne(): Promise<string> {
    await connector.connect();
    // ... logic
    await connector.closeConnection();
    return 'old CarEntity';
  }

  async findSeveral(): Promise<string> {
    return 'selection of CarEntity';
  }

  async update(): Promise<string> {
    return 'updated CarEntity';
  }

  async delete(): Promise<string> {
    return 'CarEntity has been deleted';
  }
}
