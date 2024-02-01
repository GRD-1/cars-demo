import connector from '../utils/mongo-connector.util';
import { CarDto } from './dto/car.dto';
import { CarDocument, CarSchema } from './entities/car.entity';

export class CarService {
  async create(dto: CarDto): Promise<CarDocument | null> {
    const connection = await connector.getConnection([{ name: 'Cars', schema: CarSchema }]);
    const newCar = await connection.model('Cars').create(dto);
    await connection.close();
    return newCar;
  }

  async findOne(): Promise<string> {
    // await connector.connect();
    // ... logic
    // await connector.closeConnection();
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
