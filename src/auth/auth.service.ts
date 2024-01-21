export class AuthService {
  async register(): Promise<string> {
    return 'register ok';
  }

  async login(): Promise<string> {
    return 'register ok';
  }

  async getUserById(): Promise<string | undefined> {
    return 'userEntity';
  }
}
