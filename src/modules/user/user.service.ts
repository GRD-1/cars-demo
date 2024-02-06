import { UserDto } from './dto/user.dto';
import MongoConnector from '../../utils/mongo-connector.util';
import { UserDocument, userModelData } from './entities/user.entity';
import serviceProvider from '../../utils/service-provider.util';

export class UserService {
  private db: MongoConnector

  constructor() {
    this.db = serviceProvider.getService(MongoConnector);
  }

  async register(dto: UserDto): Promise<UserDocument | null> {
    const connection = await this.db.getConnection([userModelData]);
    const newUser = await connection.model('Users').create(dto);
    await connection.close();
    return newUser;
  }

  async login(dto: UserDto): Promise<UserDocument | null> {
    const connection = await this.db.getConnection([userModelData]);
    const user = await connection.model('Users').findOne(dto);
    await connection.close();
    return user;
  }

  async findById(id: string): Promise<UserDocument | null> {
    const connection = await this.db.getConnection([userModelData]);
    const user = await connection.model('Users').findById(id).exec();
    await connection.close();
    return user;
  }
}
