// import { JwtStrategy, ExtractJwt } from 'passport-jwt';
// import * as passport from 'passport';
// import * as process from 'process';
//
// const opts = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.JWT_SECRET,
//   issuer: 'accounts.examplesoft.com',
//   audience: 'yoursite.net',
// };
//
// passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//   User.findOne({id: jwt_payload.sub}, function(err, user) {
//     if (err) {
//       return done(err, false);
//     }
//     if (user) {
//       return done(null, user);
//     } else {
//       return done(null, false);
//       // or you could create a new account
//     }
//   });
// }));
//

import { UserDto } from './dto/user.dto';
import { UserDocument } from './entities/user.entity';

export class AuthService {
  async register(dto: UserDto): Promise<UserDocument | null> {
    return null;
  }

  async login(dto: UserDto): Promise<UserDocument | null> {
    return null;
  }
}
