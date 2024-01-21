import { AuthDto } from './dto/auth.dto';

export class AuthService {
  async register(dto: AuthDto): Promise<string | null> {
    return 'register ok';
  }

  async login(): Promise<string> {
    return 'register ok';
  }

  async findOne(dto: AuthDto): Promise<AuthDto | null> {
    // const user = await this.userRepository.find({
    //   where: [
    //     { id: userData.id },
    //     { login: userData.login },
    //     { email: userData.email }
    //   ]
    // });
    // return user[0];
    return null;
  }
}
