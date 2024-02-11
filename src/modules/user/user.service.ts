import { sign } from 'jsonwebtoken';
import * as process from 'process';
import bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Connection } from 'mongoose';
import { CustomError } from '../../types/custom-error.type';
import { UserDto } from './dto/user.dto';
import MongoConnector from '../../services/mongo-connector.service';
import { UserDocument, userModelData } from './entities/user.entity';
import serviceProvider from '../../services/service-provider.service';
import { UserResponseType } from './types/user-response.type';
import {
  ENV_VARIABLE_UNAVAILABLE,
  INVALID_CREDENTIALS,
  INVALID_JWT, INVALID_REFRESH_JWT,
} from '../../constants/err.constant';

export class UserService {
  private db: MongoConnector

  constructor() {
    this.db = serviceProvider.getService(MongoConnector);
  }

  async register(dto: UserDto): Promise<UserResponseType> {
    const salt = await bcrypt.genSalt(10);
    const userData = {
      username: dto.username,
      passwordHash: bcrypt.hashSync(dto.password, salt),
      salt,
    };
    const connection = await this.db.getConnection([userModelData]);
    const newUser = await connection.model('Users').create(userData);
    const response = await this.buildResponseWithJwt(newUser, connection);
    await connection.close();
    return response;
  }

  async login(dto: UserDto): Promise<UserResponseType> {
    const connection = await this.db.getConnection([userModelData]);
    const user = await connection.model('Users').findOne({ username: dto.username });
    const hashedPassword = bcrypt.hashSync(dto.password, user.salt);
    const isPasswordValid = bcrypt.compareSync(dto.password, hashedPassword);
    if (!isPasswordValid) throw new CustomError(401, INVALID_CREDENTIALS);
    const response = await this.buildResponseWithJwt(user, connection);
    await connection.close();
    return response;
  }

  async replaceTokens(userId: string, refreshToken: string): Promise<UserResponseType> {
    const connection = await this.db.getConnection([userModelData]);
    const user = await connection.model('Users').findOne({ _id: userId });
    if (!user) throw new CustomError(401, INVALID_JWT);
    if (user.refreshToken !== refreshToken) throw new CustomError(401, INVALID_REFRESH_JWT);
    const response = await this.buildResponseWithJwt(user, connection);
    await connection.close();
    return response;
  }

  async findById(id: string): Promise<UserDocument | null> {
    const connection = await this.db.getConnection([userModelData]);
    const user = await connection.model('Users').findById(id).exec();
    await connection.close();
    return user;
  }

  async buildResponseWithJwt(user: UserDocument, connection: Connection): Promise<UserResponseType> {
    const userdata = user.toObject();
    const accessToken = await this.generateAccessJwt(user);
    const refreshToken = await this.generateRefreshJwt();
    await connection.model('Users').updateOne({ _id: user._id }, { refreshToken });
    return { _id: userdata._id, username: userdata.username, accessToken, refreshToken };
  }

  async generateAccessJwt(user: UserDocument): Promise<string> {
    if (!process.env.JWT_SECRET) throw new Error(`${ENV_VARIABLE_UNAVAILABLE}: JWT_SECRET`);
    if (!process.env.ACCESS_TOKEN_EXPIRES) throw new Error(`${ENV_VARIABLE_UNAVAILABLE}: ACCESS_TOKEN_EXPIRES`);
    return sign({
      _id: user._id,
      username: user.username,
    }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES });
  }

  async generateRefreshJwt(): Promise<string> {
    if (!process.env.JWT_SECRET) throw new Error(`${ENV_VARIABLE_UNAVAILABLE}: JWT_SECRET`);
    if (!process.env.REFRESH_TOKEN_EXPIRES) throw new Error(`${ENV_VARIABLE_UNAVAILABLE}: REFRESH_TOKEN_EXPIRES`);
    const randomHash = crypto.randomBytes(64).toString('hex');
    return sign({
      randomHash,
    }, process.env.JWT_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES });
  }
}
