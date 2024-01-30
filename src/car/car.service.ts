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
    return 'updated CarEntity';
  }

  async delete(): Promise<string> {
    return 'CarEntity has been deleted';
  }
}
