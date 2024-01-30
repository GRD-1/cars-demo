import { CustomError } from '../errors/custom-error.type';

export class CarService {
  async create(): Promise<string> {
    return 'new CarEntity';
  }

  async getById(): Promise<string> {
    throw new Error('Ravoly!!!');
    return 'old CarEntity';
  }

  async getSelection(): Promise<string> {
    return 'selection of CarEntity';
  }

  async update(): Promise<string> {
    throw new CustomError(411, 'Telapia!!!');
    return 'updated CarEntity';
  }

  async delete(): Promise<string> {
    return 'CarEntity has been deleted';
  }
}
