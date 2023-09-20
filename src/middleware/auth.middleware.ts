import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import { MyFirebaseService } from 'src/services/FirebaseService';
const mm = '🔐 🔐 🔐 AuthMiddleware 🔐 ';
const errorMessage = '🔴 🔴 🔴 Request is Unauthorized';

interface AuthenticatedRequest extends Request {
  user: admin.auth.DecodedIdToken;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly fbService: MyFirebaseService) {}
  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken) {
      Logger.log(`${mm} authentication token not found in request header 🔴`);
      return res.status(401).json({
        message: errorMessage,
        statusCode: 401,
        date: new Date().toISOString(),
      });
    }
    try {
      // Logger.log(`${mm} authentication starting: 🔵 authToken: ${authToken}`);
      // Verify the authentication token using Firebase Admin SDK
      //await this.fbService.initializeFirebase(); Bearer
      const token = authToken.substring(7);
      // Logger.log(`${mm} authentication continua: 🔵 token: ${token}`);

      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken; // Set the authenticated user in the request object
      // Logger.log(`${mm} authentication seems OK; ✅ req: ${req}`);

      next();
    } catch (error) {
      Logger.log(`${mm} Error verifying authentication token: 🔴 ${error} 🔴`);
      return res.status(401).json({
        message: errorMessage,
        statusCode: 401,
        date: new Date().toISOString(),
      });
    }
  }
}
