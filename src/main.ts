/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as helmet from 'helmet';
import * as rateLimiter from 'express-rate-limit';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { GoogleAuth } from 'google-auth-library';

import { MyUtils } from './my-utils/my-utils';
import { MyFirebaseService } from './services/FirebaseService';
const mm = '🔵 🔵 🔵 🔵 🔵 🔵 Kasie Transie Bootstrap 🔵 🔵';
const env = process.env.NODE_ENV;
Logger.log(`${mm} Kasie NODE_ENV : ${env}`);

const srv: MyFirebaseService = new MyFirebaseService();
async function bootstrap() {
  Logger.log(`${mm} ... Kasie NestJS Backend bootstrapping .....`);

  const app = await NestFactory.create(AppModule);
  const port = MyUtils.getPort();
  Logger.log(`${mm} ... Kasie Backend running on port : ${port} `);

  // app.use(helmet());
  app.enableCors();
  await app.listen(port);
  await srv.initializeFirebase();
  await srv.sendInitializationMessage();
}
bootstrap();
