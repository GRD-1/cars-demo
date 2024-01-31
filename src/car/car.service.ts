import connector from '../utils/mongo-connector.util';

export class CarService {
  async create(): Promise<string> {
    return 'new CarEntity';
  }

  async getById(): Promise<string> {
    await connector.connect();
    return 'old CarEntity';
  }

  async getSelection(): Promise<string> {
    return 'selection of CarEntity';
  }

  async update(): Promise<string> {
    return 'updated CarEntity';
  }

  async delete(): Promise<string> {
    return 'CarEntity has been deleted';
  }
}
