// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { AuthService } from './auth.service';

// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   constructor(private authService: AuthService) {}

//   async use(req: Request, res: Response, next: NextFunction) {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (token) {
//       const decodedToken = this.authService.verifyToken(token);
//       if (decodedToken) {
//         req.user = { id: decodedToken.userId };
//       }
//     }
//     next();
//   }
// }
