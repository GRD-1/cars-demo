import { sign } from 'jsonwebtoken';
import * as process from 'process';
import bcrypt from 'bcrypt';
import { CustomError } from '../../types/custom-error.type';
import { UserDto } from './dto/user.dto';
import MongoConnector from '../../services/mongo-connector.service';
import { UserDocument, userModelData } from './entities/user.entity';
import serviceProvider from '../../services/service-provider.service';
import { UserResponseType } from './types/user-response.type';
import { ENV_VARIABLE_UNAVAILABLE, INVALID_CREDENTIALS } from '../../constants/err.constant';

export class UserService {
  private db: MongoConnector

  constructor() {
    this.db = serviceProvider.getService(MongoConnector);
  }

  async register(dto: UserDto): Promise<UserResponseType> {
    const userData = {
      login: dto.login,
      passwordHash: bcrypt.hashSync(dto.password, 10),
    };

    const connection = await this.db.getConnection([userModelData]);
    const newUser = await connection.model('Users').create(userData);
    await connection.close();
    return this.buildResponseWithJwt(newUser);
  }

  async login(dto: UserDto): Promise<UserResponseType> {
    const connection = await this.db.getConnection([userModelData]);
    const user = await connection.model('Users').findOne(dto);
    await connection.close();
    const hashedPassword = bcrypt.hashSync(dto.password, 10);
    const isPasswordValid = bcrypt.compareSync(dto.password, hashedPassword);
    if (!isPasswordValid) throw new CustomError(401, INVALID_CREDENTIALS);
    return this.buildResponseWithJwt(user);
  }

  async findById(id: string): Promise<UserDocument | null> {
    const connection = await this.db.getConnection([userModelData]);
    const user = await connection.model('Users').findById(id).exec();
    await connection.close();
    return user;
  }

  async buildResponseWithJwt(user: UserDocument): Promise<UserResponseType> {
    const token = await this.generateJwt(user);
    const userdata = user.toObject();
    return { ...userdata, token };
  }

  async generateJwt(user: UserDocument): Promise<string> {
    if (!process.env.JWT_SECRET) throw new Error(`${ENV_VARIABLE_UNAVAILABLE}: JWT_SECRET`);
    if (!process.env.TOKEN_EXPIRES) throw new Error(`${ENV_VARIABLE_UNAVAILABLE}: TOKEN_EXPIRES`);
    return sign({
      _id: user._id,
      login: user.login,
    }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRES });
  }
}
