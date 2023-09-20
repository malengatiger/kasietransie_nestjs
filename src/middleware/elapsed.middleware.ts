import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const mm = ' 🔇 🔇 🔇 ElapsedTimeMiddleware';
@Injectable()
export class ElapsedTimeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('finish', () => {
      const elapsed = Date.now() - start;
      Logger.log(`${mm} ${req.originalUrl} took  🔴 ${elapsed}ms  🔴 `);
    });

    next();
  }
}
