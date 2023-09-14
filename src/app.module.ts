import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
// import { DatabaseModule } from './database/database.module';
import { config } from 'src/config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MyUtils } from './my-utils/my-utils';
import { DataService } from './data/data.service';
import { AssociationController } from './association_controller/association_controller.controller';
import { AssociationService } from './association_service/association_service.service';
import { AppError, AppErrorSchema } from './data/models/appError';
import { Association, AssociationSchema } from './data/models/association';
import {
  SettingsModel,
  SettingsModelSchema,
} from './data/models/settingsModel';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRoot(MyUtils.getDatabaseUrl()),
    MongooseModule.forFeature([
      { name: AppError.name, schema: AppErrorSchema },
    ]),
    MongooseModule.forFeature([
      { name: Association.name, schema: AssociationSchema },
    ]),
    MongooseModule.forFeature([
      { name: SettingsModel.name, schema: SettingsModelSchema },
    ]),
  ],
  controllers: [AppController, AssociationController],
  providers: [AppService, DataService, AssociationService],
})
export class AppModule {}
