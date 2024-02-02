import { AuthDto } from './dto/auth.dto';
// import { UserDocument, UserEntity } from './entities/user.entity';
import db from '../utils/mongo-connector.util';
import { AuthLoginResponse } from './types/auth-login-response.type';

export class AuthService {
  async register(dto: AuthDto): Promise<void> {
    // await db.connect();
    // let newUser = new UserEntity();
    // Object.assign(newUser, dto);
    // newUser = await UserEntity.create(newUser);
    // const 1 = await UserModel.create({
    //   username: 'exampleUser',
    //   passwordHash: 'hashedPassword', // You would typically hash the password before storing it
    // });
    // await db.close();
    // return null;
    // const userRepository = await dataSource.getRepository(UserEntity);
    // console.log('AuthService.register userRepository:', userRepository);

    // const oldUser = await this.findOne(dto);
    // if (oldUser?.login === dto.login) throw new HttpException(LOGIN_ALREADY_IN_USE, HttpStatus.UNPROCESSABLE_ENTITY);
    // if (oldUser?.email === dto.email) throw new HttpException(EMAIL_ALREADY_IN_USE, HttpStatus.UNPROCESSABLE_ENTITY);
    // const newUser = new UserEntity();
    // Object.assign(newUser, dto);
    // const user = await this.userRepository.save(newUser);
    // // return this.buildUserResponseWithToken(user);
    // return user;
  }

  async login(): Promise<string> {
    return 'login ok';
  }

  // async findOne(dto: AuthDto): Promise<UserDocument | null> {
  //   // const user = await this.userRepository.find({
  //   //   where: [
  //   //     { login: dto.login },
  //   //   ],
  //   // });
  //   // return user[0];
  //   return null;
  // }

  // async buildUserResponseWithToken(user: UserDocument): Promise<AuthLoginResponse> {
  //   const token = await this.generateJwt(user);
  //   const { passwordHash, ...userWithoutPassword } = user;
  //   return { ...userWithoutPassword, token };
  // }
  //
  // async generateJwt(user: UserDocument): Promise<string> {
  //   const secret = this.configService.get('JWT_SECRET');
  //   return sign({
  //     id: user.id,
  //     login: user.login,
  //     email: user.email,
  //   }, secret);
  // }
}
