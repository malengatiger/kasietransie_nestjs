/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as helmet from 'helmet';
import * as rateLimiter from 'express-rate-limit';
import { ConfigService } from '@nestjs/config';

import { MyUtils } from './my-utils/my-utils';
const mm = '🔵 🔵 🔵 🔵 🔵 🔵 Kasie Transie Bootstrap 🔵 🔵';
const env = process.env.NODE_ENV;
Logger.log(`${mm} Kasie NODE_ENV : ${env}`);

async function bootstrap() {
  Logger.log(`${mm} ... Kasie NestJS Backend bootstrapping .....`);

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  Logger.log(`${mm} ... Kasie ConfigService : ${configService}`);
  const port = configService.get<number>('port');
  Logger.log(`${mm} ... Kasie port from ConfigService : ${port}`);

  // app.use(helmet());
  app.enableCors();
  await app.listen(port);
}
bootstrap();
