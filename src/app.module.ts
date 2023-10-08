import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { AppError, AppErrorSchema } from './data/models/AppError';
import { Association, AssociationSchema } from './data/models/Association';
import {
  SettingsModel,
  SettingsModelSchema,
} from './data/models/SettingsModel';
import { User, UserSchema } from './data/models/User';
import { MyFirebaseService } from './services/FirebaseService';
import { ExampleFile, ExampleFileSchema } from './data/models/ExampleFile';
import { FileArchiverService } from './my-utils/zipper';
import { Vehicle, VehicleSchema } from './data/models/Vehicle';
import { MessagingService } from './messaging/messaging.service';
import { DispatchService } from './services/DispatchService';
import {
  RouteLandmark,
  RouteLandmarkSchema,
} from './data/models/RouteLandmark';
import {
  RouteAssignment,
  RouteAssignmentSchema,
} from './data/models/RouteAssignment';
import { Route, RouteSchema } from './data/models/Route';
import {
  DispatchRecord,
  DispatchRecordSchema,
} from 'src/data/models/DispatchRecord';
import {
  VehicleArrival,
  VehicleArrivalSchema,
} from './data/models/VehicleArrival';
import {
  VehicleDeparture,
  VehicleDepartureSchema,
} from './data/models/VehicleDeparture';
import {
  AmbassadorPassengerCount,
  AmbassadorPassengerCountSchema,
} from './data/models/AmbassadorPassengerCount';
import { RoutePoint, RoutePointSchema } from './data/models/RoutePoint';
import { DispatchController } from './controllers/dispatch_controller';
import { TranslationService } from './translation/translation.service';
import { TranslationController } from './translation/translation.controller';
// import { Country, CountrySchema } from './data/models/Country';
import {
  TranslationBag,
  TranslationBagSchema,
} from './data/models/TranslationBag';
import { Country, CountrySchema } from 'src/data/models/Country';
import { DataApiService } from './data-api/data-api.service';
import { HeartbeatService } from './services/HeartbeatService';
import { HeartbeatController } from './heartbeat/heartbeat.controller';
import {
  VehicleHeartbeat,
  VehicleHeartbeatSchema,
} from './data/models/VehicleHeartbeat';
import { RouteController } from './controllers/route_controller';
import { RouteService } from './services/RouteService';
import { UserService } from './services/UserService';
import {
  RouteUpdateRequest,
  RouteUpdateRequestSchema,
} from './data/models/RouteUpdateRequest';
import {
  VehicleMediaRequest,
  VehicleMediaRequestSchema,
} from './data/models/VehicleMediaRequest';
import { RouteCity, RouteCitySchema } from './data/models/RouteCity';
import {
  CalculatedDistance,
  CalculatedDistanceSchema,
} from './data/models/CalculatedDistance';
import { CarController } from './controllers/car_controller';
import { VehicleService } from './services/VehicleService';
import { UserController } from './controllers/user_controller';
import {
  UserGeofenceEvent,
  UserGeofenceEventSchema,
} from './data/models/UserGeofenceEvent';
import { AuthMiddleware } from './middleware/auth.middleware';
import { ElapsedTimeMiddleware } from './middleware/elapsed.middleware';
import { AmbassadorService } from './services/AmbassadorService';
import { AmbassadorController } from './controllers/ambassador_controller';
import {
  AmbassadorCheckIn,
  AmbassadorCheckInSchema,
} from './data/models/AmbassadorCheckIn';
import { MediaService } from './services/MediaService';
import { VehiclePhoto, VehiclePhotoSchema } from './data/models/VehiclePhoto';
import { VehicleVideo, VehicleVideoSchema } from './data/models/VehicleVideo';
import { CityService } from './services/CityService';
import { City, CitySchema } from './data/models/City';
import { LocationRequestService } from './services/LocationRequestService';
import {
  LocationRequest,
  LocationRequestSchema,
} from './data/models/LocationRequest';
import {
  LocationResponse,
  LocationResponseSchema,
} from './data/models/LocationResponse';
import { KasieError, KasieErrorSchema } from './my-utils/kasie.error';
import { ErrorService } from './services/ErrorService';
import { ErrorController } from './controllers/error_controller';
import {
  CommuterRequest,
  CommuterRequestSchema,
} from './data/models/CommuterRequest';
import { TimeSeriesService } from './services/TimeSeriesService';
import {
  VehicleHeartbeatTimeSeries,
  VehicleHeartbeatTimeSeriesSchema,
} from './data/models/VehicleHeartbeatTimeSeries';
import {
  AssociationToken,
  AssociationTokenSchema,
} from './data/models/AssociationToken';
import { Commuter, CommuterSchema } from './data/models/Commuter';
import { CommuterService } from './services/CommuterService';
import {
  CommuterResponse,
  CommuterResponseSchema,
} from './data/models/CommuterResponse';
import {
  PassengerTimeSeries,
  PassengerTimeSeriesSchema,
} from './data/models/PassengerTimeSeries';

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
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
    MongooseModule.forFeature([
      { name: Association.name, schema: AssociationSchema },
    ]),
    MongooseModule.forFeature([
      { name: SettingsModel.name, schema: SettingsModelSchema },
    ]),
    MongooseModule.forFeature([
      { name: AssociationToken.name, schema: AssociationTokenSchema },
    ]),
    MongooseModule.forFeature([
      { name: ExampleFile.name, schema: ExampleFileSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

    MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }]),

    MongooseModule.forFeature([
      { name: RouteLandmark.name, schema: RouteLandmarkSchema },
    ]),
    MongooseModule.forFeature([{ name: Route.name, schema: RouteSchema }]),
    MongooseModule.forFeature([
      { name: DispatchRecord.name, schema: DispatchRecordSchema },
    ]),
    MongooseModule.forFeature([
      { name: RouteAssignment.name, schema: RouteAssignmentSchema },
    ]),
    MongooseModule.forFeature([
      { name: VehicleArrival.name, schema: VehicleArrivalSchema },
    ]),
    MongooseModule.forFeature([
      { name: VehicleDeparture.name, schema: VehicleDepartureSchema },
    ]),
    MongooseModule.forFeature([
      {
        name: AmbassadorPassengerCount.name,
        schema: AmbassadorPassengerCountSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Commuter.name,
        schema: CommuterSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: CommuterRequest.name,
        schema: CommuterRequestSchema,
      },
    ]),
    MongooseModule.forFeature([
      { name: RoutePoint.name, schema: RoutePointSchema },
    ]),
    MongooseModule.forFeature([
      { name: RouteCity.name, schema: RouteCitySchema },
    ]),
    MongooseModule.forFeature([
      { name: CalculatedDistance.name, schema: CalculatedDistanceSchema },
    ]),
    MongooseModule.forFeature([
      { name: VehicleHeartbeat.name, schema: VehicleHeartbeatSchema },
    ]),
    MongooseModule.forFeature([
      { name: TranslationBag.name, schema: TranslationBagSchema },
    ]),
    MongooseModule.forFeature([
      { name: RouteUpdateRequest.name, schema: RouteUpdateRequestSchema },
    ]),
    MongooseModule.forFeature([
      { name: VehicleMediaRequest.name, schema: VehicleMediaRequestSchema },
    ]),
    MongooseModule.forFeature([
      { name: UserGeofenceEvent.name, schema: UserGeofenceEventSchema },
    ]),
    MongooseModule.forFeature([
      {
        name: AmbassadorPassengerCount.name,
        schema: AmbassadorPassengerCountSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: AmbassadorCheckIn.name,
        schema: AmbassadorCheckInSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: VehiclePhoto.name,
        schema: VehiclePhotoSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: VehicleVideo.name,
        schema: VehicleVideoSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: City.name,
        schema: CitySchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: PassengerTimeSeries.name,
        schema: PassengerTimeSeriesSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: RouteUpdateRequest.name,
        schema: RouteUpdateRequestSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: LocationRequest.name,
        schema: LocationRequestSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: LocationResponse.name,
        schema: LocationResponseSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: KasieError.name,
        schema: KasieErrorSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: CommuterRequest.name,
        schema: CommuterRequestSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: VehicleHeartbeatTimeSeries.name,
        schema: VehicleHeartbeatTimeSeriesSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: CommuterResponse.name,
        schema: CommuterResponseSchema,
      },
    ]),
  ],

  controllers: [
    AppController,
    AssociationController,
    DispatchController,
    TranslationController,
    UserController,
    HeartbeatController,
    RouteController,
    CarController,
    AmbassadorController,
    ErrorController,
  ],
  providers: [
    AppService,
    MyFirebaseService,
    DataService,
    AssociationService,
    FileArchiverService,
    MessagingService,
    DispatchService,
    TranslationService,
    DataApiService,
    HeartbeatService,
    RouteService,
    UserService,
    AmbassadorService,
    VehicleService,
    MediaService,
    CityService,
    LocationRequestService,
    ErrorService,
    TimeSeriesService,
    CommuterService,
  ],
})
//export with middleware
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    Logger.log('Applying AuthMiddleWare configuration');
    consumer.apply(AuthMiddleware).forRoutes('*');
    consumer.apply(ElapsedTimeMiddleware).forRoutes('*');
    // consumer.apply(ErrorsInterceptor).forRoutes('*');
    // consumer.apply(TimeoutInterceptor).forRoutes('*');
  }
}
