import { CustomError } from '../../types/custom-error.type';
import MongoConnector from '../../utils/mongo-connector.util';
import { CarDto } from './dto/car.dto';
import { CarDocument, carModelData } from './entities/car.entity';
import { CarSelectionDto } from './dto/car-selection.dto';
import { RECORD_NOT_FOUND } from '../../constants/err.constant';
import serviceProvider from '../../utils/service-provider.util';

export class CarService {
  private db: MongoConnector;

  constructor() {
    this.db = serviceProvider.getService(MongoConnector);
  }

  async create(dto: CarDto): Promise<CarDocument | null> {
    const connection = await this.db.getConnection([carModelData]);
    const newCar = await connection.model('Cars').create(dto);
    await connection.close();
    return newCar;
  }

  async findById(id: string): Promise<CarDocument | null> {
    const connection = await this.db.getConnection([carModelData]);
    const car = await connection.model('Cars').findById(id).exec();
    await connection.close();
    return car;
  }

  async findSeveral(dto: CarSelectionDto): Promise<CarDocument[]> {
    const connection = await this.db.getConnection([carModelData]);
    const cars = await connection.model('Cars').find(dto).exec();
    await connection.close();
    return cars;
  }

  async update(id: string, dto: CarDto): Promise<number> {
    const connection = await this.db.getConnection([carModelData]);
    const res = await connection.model('Cars').updateOne({ _id: id }, dto);
    await connection.close();
    if (res.modifiedCount < 1) throw new CustomError(404, RECORD_NOT_FOUND);
    return res.modifiedCount;
  }

  async delete(id: string): Promise<number> {
    const connection = await this.db.getConnection([carModelData]);
    const res = await connection.model('Cars').deleteOne({ _id: id });
    await connection.close();
    if (res.deletedCount < 1) throw new CustomError(404, RECORD_NOT_FOUND);
    return res.deletedCount;
  }
}
