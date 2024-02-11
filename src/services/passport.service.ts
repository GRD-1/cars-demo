import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import * as process from 'process';
import passport from 'passport';
import serviceProvider from './service-provider.service';
import { UserService } from '../modules/user/user.service';
import { UserDocument } from '../modules/user/entities/user.entity';

const userService = serviceProvider.getService(UserService);

export class PassportService {
  private static _instance: PassportService;
  public passport: any;

  constructor() {
    this.passport = new passport.Passport();
    this.passport.initialize();
    const strategy = this.getStrategy();
    this.passport.use('jwt', strategy);
  }

  getStrategy(): Strategy {
    const opts = this.getOpts();
    return new Strategy(opts, async (jwtPayload, done) => {
      try {
        const user = await userService.findById(jwtPayload._id);
        this.strategyCallback(user as UserDocument, done);
      } catch (e) {
        done(e, false);
      }
    });
  }

  strategyCallback(user: UserDocument, done: VerifiedCallback): void {
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  }

  getOpts(): any {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET UNAVAILABLE');
    return {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };
  }

  static getInstance(): PassportService {
    if (!PassportService._instance) {
      PassportService._instance = new PassportService();
    }
    return PassportService._instance;
  }
}

export default PassportService.getInstance();
