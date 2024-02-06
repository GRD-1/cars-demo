// import { Request, Response, NextFunction } from 'express';
//
// export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const user = auth.authenticate((err, user, info) => {
//       if (err) { return next(err); }
//       if (!user) {
//         if (info.name === 'TokenExpiredError') {
//           return res.status(401).json({ message: 'Your token has expired. Please generate a new one' });
//         }
//         return res.status(401).json({ message: info.message });
//       }
//       app.set('user', user);
//       return next();
//     })(req, res, next);
//     next();
//     return;
//   } catch (e) {
//     next(e);
//   }
// };
