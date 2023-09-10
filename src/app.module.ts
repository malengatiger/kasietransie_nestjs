import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { DataModule } from './data/data.module';
import 'dotenv/config'; //
import { DevtoolsModule } from '@nestjs/devtools-integration';
import {
  FirebaseModule,
  FirebaseService,
  FirebaseMiddleware,
} from '@speakbox/nestjs-firebase-admin';
import { KasieFbService } from './kasie-fb/kasie-fb.service';
//
console.log(`🔵 🔵 Kasie backend port : ${process.env.PORT}`);
const dbUrl = process.env.DB_URI || 'checkUrl';
console.log(`🌼🌼🌼 mongodb database 🌼 url: ${dbUrl}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development', '.env.production'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(dbUrl),
    FirebaseModule,
    AuthenticationModule,
    UserModule,
    DataModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseService, FirebaseMiddleware, KasieFbService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(FirebaseModule).forRoutes(AppController);
  // }
}
