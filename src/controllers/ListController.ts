/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Post, Get, Query, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DispatchRecord } from 'src/models/DispatchRecord';
import { RouteStartEnd } from 'src/models/RouteStartEnd';
import { RouteUpdateRequest } from 'src/models/RouteUpdateRequest';
import { VehiclePhoto } from 'src/models/VehiclePhoto';
import { City } from 'src/models/City';
import { Commuter } from 'src/models/Commuter';
import { VehicleHeartbeat } from 'src/models/VehicleHeartbeat';
import { CommuterResponse } from 'src/models/CommuterResponse';
import { VehicleDeparture } from 'src/models/VehicleDeparture';
import { AppError } from 'src/models/AppError';
import { CommuterRequest } from 'src/models/CommuterRequest';
import { AmbassadorCheckIn } from 'src/models/AmbassadorCheckIn';
import { Vehicle } from 'src/models/Vehicle';
import { HeartbeatMeta } from 'src/models/HeartbeatMeta';
import { VehicleArrival } from 'src/models/VehicleArrival';
import { VehicleHeartbeatTimeSeries } from 'src/models/VehicleHeartbeatTimeSeries';
import { RoutePoint } from 'src/models/RoutePoint';
import { Timezone } from 'src/models/Timezone';
import { CalculatedDistance } from 'src/models/CalculatedDistance';
import { Association } from 'src/models/Association';
import { SettingsModel } from 'src/models/SettingsModel';
import { LocationRequest } from 'src/models/LocationRequest';
import { User } from 'src/models/User';
import { State } from 'src/models/State';
import { RoutePointList } from 'src/models/RoutePointList';
import { VehicleVideo } from 'src/models/VehicleVideo';
import { Country } from 'src/models/Country';
import { AssociationToken } from 'src/models/AssociationToken';
import { VehicleMediaRequest } from 'src/models/VehicleMediaRequest';
import { RegistrationBag } from 'src/models/RegistrationBag';
import { CountryBag } from 'src/models/CountryBag';
import { RouteLandmark } from 'src/models/RouteLandmark';
import { RouteCity } from 'src/models/RouteCity';
import { UserGeofenceEvent } from 'src/models/UserGeofenceEvent';
import { RouteAssignment } from 'src/models/RouteAssignment';
import { ExampleFile } from 'src/models/ExampleFile';
import { LocationResponse } from 'src/models/LocationResponse';
import { AmbassadorPassengerCount } from 'src/models/AmbassadorPassengerCount';
import { Position } from 'src/models/Position';
import { RouteInfo } from 'src/helpers/RouteInfo';
import { TranslationBag } from 'src/helpers/TranslationBag';
import { Route } from 'src/models/Route';
import { Landmark } from 'src/models/Landmark';
import { CounterBag } from 'src/helpers/CounterBag';
import { AssociationHeartbeatAggregationId } from 'src/helpers/AssociationHeartbeatAggregationId';
import { TranslationInput } from 'src/helpers/TranslationInput';
import { VehicleBag } from 'src/helpers/VehicleBag';
import { RouteBag } from 'src/helpers/RouteBag';
import { RouteAssignmentList } from 'src/helpers/RouteAssignmentList';
import { AppErrors } from 'src/helpers/AppErrors';
import { VehicleHeartbeatAggregationResult } from 'src/helpers/VehicleHeartbeatAggregationResult';
import { DispatchRecordList } from 'src/helpers/DispatchRecordList';
import { AssociationCounts } from 'src/helpers/AssociationCounts';
import { VehicleList } from 'src/helpers/VehicleList';
import { CalculatedDistanceList } from 'src/helpers/CalculatedDistanceList';
import { RouteDistanceFromSearch } from 'src/helpers/RouteDistanceFromSearch';
import { AssociationBag } from 'src/helpers/AssociationBag';
import { GenerationRequest } from 'src/helpers/GenerationRequest';
import { RouteSearchInfo } from 'src/helpers/RouteSearchInfo';
import { VehicleHeartbeatAggregationId } from 'src/helpers/VehicleHeartbeatAggregationId';
import { RouteBagList } from 'src/helpers/RouteBagList';
import { BigBag } from 'src/helpers/BigBag';
import { AssociationHeartbeatAggregationResult } from 'src/helpers/AssociationHeartbeatAggregationResult';
import { AmbassadorService } from 'src/services/AmbassadorService';
import { CityService } from 'src/services/CityService';
import { LocationRequestService } from 'src/services/LocationRequestService';
import { UserService } from 'src/services/UserService';
import { DataFileService } from 'src/services/DataFileService';
import { TimeSeriesService } from 'src/services/TimeSeriesService';
import { GeoHashFixer } from 'src/services/GeoHashFixer';
import { CloudStorageUploaderService } from 'src/services/CloudStorageUploaderService';
import { DispatchService } from 'src/services/DispatchService';
import { DispatchAsyncHelperService } from 'src/services/DispatchAsyncHelperService';
import { MongoService } from 'src/services/MongoService';
import { LandmarkService } from 'src/services/LandmarkService';
import { SecretManagerService } from 'src/services/SecretManagerService';
import { TextTranslationService } from 'src/services/TextTranslationService';
import { VehicleService } from 'src/services/VehicleService';
import { MailService } from 'src/services/MailService';
import { MessagingService } from 'src/services/MessagingService';
import { UserGeofenceService } from 'src/services/UserGeofenceService';
import { FirebaseService } from 'src/services/FirebaseService';
import { RouteService } from 'src/services/RouteService';
import { MediaService } from 'src/services/MediaService';
import { CommuterService } from 'src/services/CommuterService';
import { HeartbeatService } from 'src/services/HeartbeatService';
import { AssociationService } from 'src/services/AssociationService';
import { Response } from 'express';
import * as fs from 'fs';
import * as archiver from 'archiver';

const mm = 'ListController';

@Controller()
export class ListController {
  constructor(
    private configService: ConfigService,
    private readonly ambassadorService: AmbassadorService,
    private readonly cityService: CityService,
    private readonly locationRequestService: LocationRequestService,
    private readonly userService: UserService,
    private readonly dataFileService: DataFileService,
    private readonly timeSeriesService: TimeSeriesService,
    private readonly geoHashFixer: GeoHashFixer,
    private readonly cloudStorageUploaderService: CloudStorageUploaderService,
    private readonly dispatchService: DispatchService,
    private readonly dispatchAsyncHelperService: DispatchAsyncHelperService,
    private readonly mongoService: MongoService,
    private readonly landmarkService: LandmarkService,
    private readonly secretManagerService: SecretManagerService,
    private readonly textTranslationService: TextTranslationService,
    private readonly vehicleService: VehicleService,
    private readonly mailService: MailService,
    private readonly messagingService: MessagingService,
    private readonly userGeofenceService: UserGeofenceService,
    private readonly firebaseService: FirebaseService,
    private readonly routeService: RouteService,
    private readonly mediaService: MediaService,
    private readonly commuterService: CommuterService,
    private readonly heartbeatService: HeartbeatService,
    private readonly associationService: AssociationService,
  ) {}

  @Get('getRoutePointAggregate')
  public async getRoutePointAggregate(): Promise<any> {
    return null;
  }
  @Get('getUserById')
  public async getUserById(userId: string): Promise<User> {
    const user = await this.userService.getUserById(userId);
    return user;
  }
  @Get('getUserByEmail')
  public async getUserByEmail(email: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    return user;
  }
  @Get('getAssociationById')
  public async getAssociationById(associationId: string): Promise<any> {
    return null;
  }
  @Get('getAssociationUsers')
  public async getAssociationUsers(associationId: string): Promise<any> {
    return null;
  }
  @Get('getAssociationRoutes')
  public async getAssociationRoutes(associationId: string): Promise<any> {
    return null;
  }
  @Get('getAssociationVehicles')
  public async getAssociationVehicles(
    associationId: string,
    page: number,
  ): Promise<any> {
    return null;
  }
  @Get('getAssociations')
  public async getAssociations(): Promise<any> {
    return null;
  }
  @Get('getAssociationBag')
  public async getAssociationBag(
    associationId: string,
    startDate: string,
  ): Promise<any> {
    return null;
  }
  @Get('getAssociationCounts')
  public async getAssociationCounts(
    associationId: string,
    startDate: string,
  ): Promise<any> {
    return null;
  }
  @Get('getVehicleHeartbeats')
  public async getVehicleHeartbeats(
    associationId: string,
    cutoffHours: number,
  ): Promise<any> {
    return null;
  }
  @Get('getExampleFiles')
  public async getExampleFiles(): Promise<any> {
    return null;
  }
  @Get('getOwnerVehicleHeartbeats')
  public async getOwnerVehicleHeartbeats(
    associationId: string,
    cutoffHours: number,
  ): Promise<any> {
    return null;
  }
  @Get('getAssociationAppErrors')
  public async getAssociationAppErrors(associationId: string): Promise<any> {
    return null;
  }
  @Get('getRoutePoints')
  public async getRoutePoints(routeId: string, page: number): Promise<any> {
    return null;
  }
  @Get('getAssociationRoutePoints')
  public async getAssociationRoutePoints(associationId: string): Promise<any> {
    return null;
  }
  @Get('getAssociationRouteCities')
  public async getAssociationRouteCities(associationId: string): Promise<any> {
    return null;
  }
  @Get('getRouteCities')
  public async getRouteCities(routeId: string): Promise<any> {
    return null;
  }
  @Get('getMarshalDispatchRecords')
  public async getMarshalDispatchRecords(
    userId: string,
    startDate: string,
  ): Promise<any> {
    return null;
  }
  @Get('getUserAmbassadorCheckIn')
  public async getUserAmbassadorCheckIn(
    userId: string,
    startDate: string,
  ): Promise<any> {
    return null;
  }
  @Get('getRoutePassengerCounts')
  public async getRoutePassengerCounts(
    routeId: string,
    startDate: string,
  ): Promise<any> {
    return null;
  }
  @Get('getRouteCommuterRequests')
  public async getRouteCommuterRequests(
    routeId: string,
    startDate: string,
  ): Promise<any> {
    return null;
  }
  @Get('getRouteDispatchRecords')
  public async getRouteDispatchRecords(
    routeId: string,
    startDate: string,
  ): Promise<any> {
    return null;
  }
  @Get('getRouteVehicleArrivals')
  public async getRouteVehicleArrivals(
    routeId: string,
    startDate: string,
  ): Promise<any> {
    return null;
  }
  @Get('getVehicleRouteAssignments')
  public async getVehicleRouteAssignments(vehicleId: string): Promise<any> {
    return null;
  }
  @Get('getRouteAssignments')
  public async getRouteAssignments(routeId: string): Promise<any> {
    return null;
  }
  @Get('getOwnersBag')
  public async getOwnersBag(userId: string, startDate: string): Promise<any> {
    return null;
  }
  @Get('getVehicleCounts')
  public async getVehicleCounts(vehicleId: string): Promise<any> {
    return null;
  }
  @Get('getVehicleCountsByDate')
  public async getVehicleCountsByDate(
    vehicleId: string,
    startDate: string,
  ): Promise<any> {
    return null;
  }
  @Get('getVehicleBag')
  public async getVehicleBag(
    vehicleId: string,
    startDate: string,
  ): Promise<any> {
    return null;
  }
  @Get('countVehicleArrivals')
  public async countVehicleArrivals(vehicleId: string): Promise<any> {
    return null;
  }
  @Get('countVehicleDispatches')
  public async countVehicleDispatches(vehicleId: string): Promise<any> {
    return null;
  }
  @Get('countVehicleHeartbeats')
  public async countVehicleHeartbeats(vehicleId: string): Promise<any> {
    return null;
  }
  @Get('getOwnerVehicles')
  public async getOwnerVehicles(userId: string, page: number): Promise<any> {
    return null;
  }

  @Get('getVehicleMediaRequests')
  public async getVehicleMediaRequests(vehicleId: string): Promise<any> {
    return null;
  }
  @Get('getVehiclePhotos')
  public async getVehiclePhotos(vehicleId: string): Promise<any> {
    return null;
  }
  @Get('getVehicleVideos')
  public async getVehicleVideos(vehicleId: string): Promise<any> {
    return null;
  }
  @Get('getCalculatedDistances')
  public async getCalculatedDistances(routeId: string): Promise<any> {
    return null;
  }
  @Get('refreshRoute')
  public async refreshRoute(routeId: string): Promise<any> {
    return null;
  }
  @Get('getCountryStates')
  public async getCountryStates(countryId: string): Promise<any> {
    return null;
  }
  @Get('findCitiesByLocation')
  public async findCitiesByLocation(
    latitude: number,
    longitude: number,
    limit: number,
    radiusInKM: number,
  ): Promise<any> {
    return null;
  }
  @Get('findRoutesByLocation')
  public async findRoutesByLocation(
    latitude: number,
    longitude: number,
    radiusInKM: number,
  ): Promise<any> {
    return null;
  }
  @Get('findLandmarksByLocation')
  public async findLandmarksByLocation(
    latitude: number,
    longitude: number,
    radiusInKM: number,
  ): Promise<any> {
    return null;
  }
  @Get('getRouteLandmarks')
  public async getRouteLandmarks(routeId: string): Promise<any> {
    return null;
  }
  @Get('getRouteUpdateRequests')
  public async getRouteUpdateRequests(routeId: string): Promise<any> {
    return null;
  }
  @Get('getCountryCitiesZippedFile')
  public async getCountryCitiesZippedFile(countryId: string): Promise<byte[]> {
    return [];
  }
  @Get('getVehiclesZippedFile')
  public async getVehiclesZippedFile(associationId: string): Promise<byte[]> {
    return [];
  }
  @Get('getCountryCities')
  public async getCountryCities(countryId: string, page: number): Promise<any> {
    return null;
  }
  @Get('getCountries')
  public async getCountries(): Promise<any> {
    return null;
  }
  @Get('getAssociationBagZipped')
  public async getAssociationBagZipped(
    associationId: string,
    startDate: string,
  ): Promise<byte[]> {
    return [];
  }
  @Get('getZippedFile')
  public async getZippedFile(): Promise<any> {
    return null;
  }
  @Get('getZippedByteArray')
  public async getZippedByteArray(): Promise<any> {
    return null;
  }
  @Get('countVehicleDeparture')
  public async countVehicleDeparture(vehicleId: string): Promise<any> {
    return null;
  }
  @Get('getAssociationSettingsModels')
  public async getAssociationSettingsModels(
    associationId: string,
  ): Promise<any> {
    return null;
  }
  @Get('getAssociationVehicleHeartbeats')
  public async getAssociationVehicleHeartbeats(
    associationId: string,
    startDate: string,
  ): Promise<any> {
    return null;
  }
  @Get('getAssociationRouteLandmarks')
  public async getAssociationRouteLandmarks(
    associationId: string,
  ): Promise<any> {
    return null;
  }
  @Get('getAssociationAmbassadorCheckIn')
  public async getAssociationAmbassadorCheckIn(
    associationId: string,
    startDate: string,
  ): Promise<any> {
    return null;
  }
  @Get('getVehicleAmbassadorCheckIn')
  public async getVehicleAmbassadorCheckIn(
    vehicleId: string,
    startDate: string,
  ): Promise<any> {
    return null;
  }
  @Get('getAssociationAmbassadorPassengerCounts')
  public async getAssociationAmbassadorPassengerCounts(
    associationId: string,
    startDate: string,
  ): Promise<any> {
    return null;
  }
  @Get('getAssociationCommuterRequests')
  public async getAssociationCommuterRequests(
    associationId: string,
    startDate: string,
  ): Promise<any> {
    return null;
  }
  @Get('getAssociationDispatchRecords')
  public async getAssociationDispatchRecords(
    associationId: string,
    startDate: string,
  ): Promise<any> {
    return null;
  }
  @Get('getAssociationVehicleArrivals')
  public async getAssociationVehicleArrivals(
    associationId: string,
    startDate: string,
  ): Promise<any> {
    return null;
  }
  @Get('getUserAmbassadorPassengerCounts')
  public async getUserAmbassadorPassengerCounts(
    userId: string,
    startDate: string,
  ): Promise<any> {
    return null;
  }
  @Get('getVehicleAmbassadorPassengerCounts')
  public async getVehicleAmbassadorPassengerCounts(
    vehicleId: string,
    startDate: string,
  ): Promise<any> {
    return null;
  }

  @Get('getAssociationRouteZippedFile')
  async getAssociationRouteZippedFile(
    @Query('associationId') associationId: string,
    @Res() res: Response,
  ) {
    try {
      // Generate the file content dynamically based on associationId
      const fileContent =
        await this.routeService.getAssociationRouteZippedFile(associationId);

      // Create a zip archive
      const archive = archiver('zip', { zlib: { level: 9 } });
      archive.append(fileContent, { name: 'route.zip' });
      archive.finalize();

      // Set the response headers for zip file download
      res.attachment('route.zip');

      // Stream the zip file to the response
      archive.pipe(res);
    } catch (error) {
      // Handle error if the file content cannot be generated or streamed
      res.status(500).send('Internal Server Error');
    }
  }

  @Get('downloadExampleVehiclesFile')
  async downloadExampleVehiclesFile(
    @Query('associationId') associationId: string,
    @Res() res: Response,
  ) {
    try {
      // Generate the file content dynamically based on associationId
      const fileContent =
        await this.associationService.downloadExampleVehiclesFile();

      // Create a zip archive
      const archive = archiver('zip', { zlib: { level: 9 } });
      archive.append(fileContent, { name: 'vehicle.zip' });
      archive.finalize();

      // Set the response headers for zip file download
      res.attachment('vehicle.zip');

      // Stream the zip file to the response
      archive.pipe(res);
    } catch (error) {
      // Handle error if the file content cannot be generated or streamed
      res.status(500).send('Internal Server Error');
    }
  }
  @Get('downloadExampleUsersFile')
  async downloadExampleUsersFile(
    @Query('associationId') associationId: string,
    @Res() res: Response,
  ) {
    try {
      // Generate the file content dynamically based on associationId
      const fileContent =
        await this.associationService.downloadExampleUsersFile();

      // Create a zip archive
      const archive = archiver('zip', { zlib: { level: 9 } });
      archive.append(fileContent, { name: 'user.zip' });
      archive.finalize();

      // Set the response headers for zip file download
      res.attachment('user.zip');

      // Stream the zip file to the response
      archive.pipe(res);
    } catch (error) {
      // Handle error if the file content cannot be generated or streamed
      res.status(500).send('Internal Server Error');
    }
  }
  @Get('getAssociationVehicleMediaRequests')
  public async getAssociationVehicleMediaRequests(
    associationId: string,
    startDate: string,
  ): Promise<any> {
    const response = await this.mediaService.getAssociationVehicleMediaRequests(
      associationId,
      startDate,
    );
    return response;
  }
  @Get('findRouteLandmarksByLocation')
  public async findRouteLandmarksByLocation(
    latitude: number,
    longitude: number,
    radiusInKM: number,
  ): Promise<any> {
    return null;
  }
  @Get('findAssociationVehiclesByLocationAndTime')
  public async findAssociationVehiclesByLocationAndTime(
    associationId: string,
    latitude: number,
    longitude: number,
    minutes: number,
  ): Promise<any> {
    return null;
  }
  @Get('findOwnerVehiclesByLocationAndTime')
  public async findOwnerVehiclesByLocationAndTime(
    userId: string,
    latitude: number,
    longitude: number,
    minutes: number,
  ): Promise<any> {
    return null;
  }
  @Get('findAssociationRouteLandmarksByLocation')
  public async findAssociationRouteLandmarksByLocation(
    associationId: string,
    latitude: number,
    longitude: number,
    radiusInKM: number,
  ): Promise<any> {
    return null;
  }
  @Get('findAssociationRoutesByLocation')
  public async findAssociationRoutesByLocation(
    associationId: string,
    latitude: number,
    longitude: number,
    radiusInKM: number,
  ): Promise<any> {
    return null;
  }
  @Get('getAssociationHeartbeatTimeSeries')
  public async getAssociationHeartbeatTimeSeries(
    associationId: string,
    startDate: string,
  ): Promise<byte[]> {
    return [];
  }
  @Get('getVehicleHeartbeatTimeSeries')
  public async getVehicleHeartbeatTimeSeries(
    vehicleId: string,
    startDate: string,
  ): Promise<any> {
    return null;
  }
}
