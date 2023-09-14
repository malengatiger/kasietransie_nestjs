import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MyUtils } from 'src/my-utils/my-utils';
import { ConfigModule, ConfigService } from '@nestjs/config';

const mm = '🌍 🌍 🌍 🌍 Database Module 🌍 🌍';
const url = MyUtils.getDatabaseUrl();
Logger.log(`${mm} ... Database URI: ${url}`);
@Module({
  imports: [ConfigModule, MongooseModule.forRoot(MyUtils.getDatabaseUrl())],
  providers: [],
  exports: [],
})
export class DatabaseModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(FirebaseModule).forRoutes(AppController);
  // }
}
