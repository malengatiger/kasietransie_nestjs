import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssociationSchema } from 'src/models/Association';
import { UserSchema } from 'src/models/User';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { DataService } from './data.service';
import { CitySchema } from 'src/models/City';
import { CountrySchema } from 'src/models/Country';
import { RouteSchema } from 'src/models/Route';
import { VehicleSchema } from 'src/models/Vehicle';
import { DataController } from './data.controller';
import { CommuterSchema } from 'src/models/Commuter';
import { RouteLandmarkSchema } from 'src/models/RouteLandmark';
import { RoutePointSchema } from 'src/models/RoutePoint';
import { RouteCitySchema } from 'src/models/RouteCity';
import { VehicleArrivalSchema } from 'src/models/VehicleArrival';
import { VehicleDepartureSchema } from 'src/models/VehicleDeparture';
import { DispatchRecordSchema } from 'src/models/DispatchRecord';
import { CommuterRequestSchema } from 'src/models/CommuterRequest';
import { ExampleFileSchema } from 'src/models/ExampleFile';
import { LocationRequestSchema } from 'src/models/LocationRequest';
import { LocationResponseSchema } from 'src/models/LocationResponse';
import { RegistrationBagSchema } from 'src/models/RegistrationBag';
import { VehicleMediaRequestSchema } from 'src/models/VehicleMediaRequest';
import { VehiclePhotoSchema } from 'src/models/VehiclePhoto';
import { VehicleVideoSchema } from 'src/models/VehicleVideo';
import { VehicleHeartbeatTimeSeriesSchema } from 'src/models/VehicleHeartbeatTimeSeries';
import { AppErrorSchema } from 'src/models/AppError';
import { RouteUpdateRequestSchema } from 'src/models/RouteUpdateRequest';
import { SettingsModelSchema } from 'src/models/SettingsModel';
import { StateSchema } from 'src/models/State';
import { UserGeofenceEventSchema } from 'src/models/UserGeofenceEvent';
import { AssociationTokenSchema } from 'src/models/AssociationToken';
import { CalculatedDistanceSchema } from 'src/models/CalculatedDistance';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
      {
        name: 'RegistrationBag',
        schema: RegistrationBagSchema,
      },
      {
        name: 'Association',
        schema: AssociationSchema,
      },
      {
        name: 'City',
        schema: CitySchema,
      },
      {
        name: 'Country',
        schema: CountrySchema,
      },
      {
        name: 'Route',
        schema: RouteSchema,
      },
      {
        name: 'Vehicle',
        schema: VehicleSchema,
      },
      {
        name: 'RouteLandmark',
        schema: RouteLandmarkSchema,
      },
      {
        name: 'RoutePoint',
        schema: RoutePointSchema,
      },
      {
        name: 'Commuter',
        schema: CommuterSchema,
      },
      {
        name: 'CommuterRequest',
        schema: CommuterRequestSchema,
      },
      {
        name: 'CommuterResponse',
        schema: CommuterRequestSchema,
      },
      {
        name: 'RouteCity',
        schema: RouteCitySchema,
      },
      {
        name: 'VehicleArrival',
        schema: VehicleArrivalSchema,
      },
      {
        name: 'VehicleDeparture',
        schema: VehicleDepartureSchema,
      },
      {
        name: 'VehicleHeartbeat',
        schema: VehicleDepartureSchema,
      },
      {
        name: 'DispatchRecord',
        schema: DispatchRecordSchema,
      },
      {
        name: 'ExampleFile',
        schema: ExampleFileSchema,
      },
      {
        name: 'VehicleArrival',
        schema: VehicleArrivalSchema,
      },
      {
        name: 'LocationRequest',
        schema: LocationRequestSchema,
      },
      {
        name: 'LocationResponse',
        schema: LocationResponseSchema,
      },
      {
        name: 'VehicleMediaRequest',
        schema: VehicleMediaRequestSchema,
      },
      {
        name: 'VehiclePhoto',
        schema: VehiclePhotoSchema,
      },
      {
        name: 'VehicleVideo',
        schema: VehicleVideoSchema,
      },
      {
        name: 'VehicleHeartbeatTimeSeries',
        schema: VehicleHeartbeatTimeSeriesSchema,
      },
      {
        name: 'AppError',
        schema: AppErrorSchema,
      },
      {
        name: 'RouteUpdateRequest',
        schema: RouteUpdateRequestSchema,
      },
      {
        name: 'SettingsModel',
        schema: SettingsModelSchema,
      },
      {
        name: 'State',
        schema: StateSchema,
      },
      {
        name: 'UserGeofenceEvent',
        schema: UserGeofenceEventSchema,
      },
      {
        name: 'AssociationToken',
        schema: AssociationTokenSchema,
      },
      {
        name: 'CalculatedDistance',
        schema: CalculatedDistanceSchema,
      },
    ]),
  ],
  controllers: [UserController, DataController],
  providers: [UserService, DataService],
})
export class DataModule {}
