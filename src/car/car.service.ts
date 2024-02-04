import connector from '../utils/mongo-connector.util';
import { CarDto } from './dto/car.dto';
import { CarDocument, carModelData } from './entities/car.entity';
import { CarSelectionDto } from './dto/car-selection.dto';

export class CarService {
  async create(dto: CarDto): Promise<CarDocument | null> {
    const connection = await connector.getConnection([carModelData]);
    const newCar = await connection.model('Cars').create(dto);
    await connection.close();
    return newCar;
  }

  async findById(id: string): Promise<CarDocument | null> {
    const connection = await connector.getConnection([carModelData]);
    const car = await connection.model('Cars').findById(id).exec();
    await connection.close();
    return car;
  }

  async findSeveral(dto: CarSelectionDto): Promise<CarDocument[]> {
    const connection = await connector.getConnection([carModelData]);
    const cars = await connection.model('Cars').find(dto).exec();
    await connection.close();
    return cars;
  }

  async update(): Promise<string> {
    return 'updated CarEntity';
  }

  async delete(): Promise<string> {
    return 'CarEntity has been deleted';
  }
}
