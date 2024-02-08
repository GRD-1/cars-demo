import { ExtractJwt, Strategy } from 'passport-jwt';
import * as process from 'process';
import { model } from 'mongoose';
import passport from 'passport';
import serviceProvider from './service-provider.service';
import { UserService } from '../modules/user/user.service';
import { UserSchema } from '../modules/user/entities/user.entity';

// const userService = serviceProvider.getService(UserService);
// const opts = {
//   secretOrKey: process.env.JWT_SECRET,
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// };

export class PassportService {
  constructor() {
    console.log('\nnew PassportService created!');
    passport.initialize();
    const strategy = this.getStrategy();
    passport.use('jwt', strategy);
  }

  getStrategy(): Strategy {
    const opts = this.getOpts();
    return new Strategy(opts, (jwtPayload, done) => {
      console.log('\nnew Strategy in use!');
      model('User', UserSchema).findOne({ id: jwtPayload.sub }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    });
  }

  getOpts(): any {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET UNAVAILABLE');
    return {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };
  }
}
