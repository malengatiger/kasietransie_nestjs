/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DispatchRecord } from 'src/models/DispatchRecord';
import { RouteUpdateRequest } from 'src/models/RouteUpdateRequest';
import { VehiclePhoto } from 'src/models/VehiclePhoto';
import { City } from 'src/models/City';
import { Commuter } from 'src/models/Commuter';
import { VehicleHeartbeat } from 'src/models/VehicleHeartbeat';
import { VehicleDeparture } from 'src/models/VehicleDeparture';
import { AppError } from 'src/models/AppError';
import { CommuterRequest } from 'src/models/CommuterRequest';
import { AmbassadorCheckIn } from 'src/models/AmbassadorCheckIn';
import { Vehicle } from 'src/models/Vehicle';
import { VehicleArrival } from 'src/models/VehicleArrival';
import { Association } from 'src/models/Association';
import { SettingsModel } from 'src/models/SettingsModel';
import { LocationRequest } from 'src/models/LocationRequest';
import { User } from 'src/models/User';
import { RoutePointList } from 'src/models/RoutePointList';
import { VehicleVideo } from 'src/models/VehicleVideo';
import { VehicleMediaRequest } from 'src/models/VehicleMediaRequest';
import { RouteLandmark } from 'src/models/RouteLandmark';
import { RouteCity } from 'src/models/RouteCity';
import { UserGeofenceEvent } from 'src/models/UserGeofenceEvent';
import { LocationResponse } from 'src/models/LocationResponse';
import { AmbassadorPassengerCount } from 'src/models/AmbassadorPassengerCount';
import { Route } from 'src/models/Route';
import { Landmark } from 'src/models/Landmark';
import { TranslationInput } from 'src/helpers/TranslationInput';
import { RouteAssignmentList } from 'src/helpers/RouteAssignmentList';
import { AppErrors } from 'src/helpers/AppErrors';
import { DispatchRecordList } from 'src/helpers/DispatchRecordList';
import { CalculatedDistanceList } from 'src/helpers/CalculatedDistanceList';
import { GenerationRequest } from 'src/helpers/GenerationRequest';
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
import multer from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { request } from 'express';
import { model } from 'mongoose';
import { count } from 'rxjs';

const mm = 'DataController';

@Controller()
export class DataController {
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

  @Post('createUser')
  public async createUser(user: User): Promise<any> {
    return null;
  }
  @Post('addCity')
  public async addCity(city: City): Promise<any> {
    return null;
  }
  @Post('addVehicle')
  public async addVehicle(vehicle: Vehicle): Promise<any> {
    return null;
  }
  @Post('addRoute')
  public async addRoute(route: Route): Promise<any> {
    return null;
  }
  @Post('updateUser')
  public async updateUser(user: User): Promise<any> {
    return null;
  }

  @Post('uploadFile')
  @UseInterceptors(FileInterceptor('document'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
    if (file) {
      const { originalname, filename, size } = file;
      // Process the uploaded file here
      // ...

      return { message: 'File uploaded successfully' };
    } else {
      throw new Error('No file uploaded');
    }
  }
  @Post('uploadUserFile')
  @UseInterceptors(FileInterceptor('document'))
  async uploadUserFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('associationId') associationId: string,
  ): Promise<any> {
    if (file) {
      const { originalname, filename, size } = file;
      // Process the uploaded file here
      // ...

      return { message: 'File uploaded successfully' };
    } else {
      throw new Error('No file uploaded');
    }
  }
  @Post('ping')
  public async ping(): Promise<string> {
    return null;
  }

  @Post('uploadVehicleFile')
  @UseInterceptors(FileInterceptor('document'))
  async uploadVehicleFile(
    @UploadedFile() document: Express.Multer.File,
    @Body('associationId') associationId: string,
  ): Promise<any> {
    if (document) {
      const { originalname, filename, size } = document;
      // Process the uploaded file here
      // ...

      return { message: 'VehicleFile uploaded successfully' };
    } else {
      throw new Error('No file uploaded');
    }
  }
  @Post('importFromCSV')
  @UseInterceptors(FileInterceptor('file'))
  async importUsersFromCSV(
    @UploadedFile() file: Express.Multer.File,
    @Body('associationId') associationId: string,
  ): Promise<User[]> {
    try {
      const importedUsers = await this.userService.importUsersFromCSV(
        file,
        associationId,
      );
      return importedUsers;
    } catch (error) {
      // Handle error if the file cannot be imported or processed
      throw new Error('Failed to import users from CSV');
    }
  }
  @Post('generateCommuterRequests')
  public async generateCommuterRequests(associationId: string): Promise<any> {
    return null;
  }
  @Post('updateRouteColor')
  public async updateRouteColor(routeId: string, color: string): Promise<any> {
    return null;
  }
  @Post('deleteRoutePointsFromIndex')
  public async deleteRoutePointsFromIndex(
    routeId: string,
    index: number,
  ): Promise<any> {
    return null;
  }
  @Post('addCommuter')
  public async addCommuter(commuter: Commuter): Promise<any> {
    return null;
  }
  @Post('addCommuterRequest')
  public async addCommuterRequest(request: CommuterRequest): Promise<any> {
    return null;
  }
  @Post('updateVehicle')
  public async updateVehicle(vehicle: Vehicle): Promise<any> {
    return null;
  }
  @Post('addRouteLandmark')
  public async addRouteLandmark(landmark: RouteLandmark): Promise<any> {
    return null;
  }
  @Post('addRouteCity')
  public async addRouteCity(landmark: RouteCity): Promise<any> {
    return null;
  }
  @Post('addSettingsModel')
  public async addSettingsModel(model: SettingsModel): Promise<any> {
    return null;
  }
  @Post('addRoutePoints')
  public async addRoutePoints(routePoints: RoutePointList): Promise<any> {
    return null;
  }
  @Post('addCalculatedDistances')
  public async addCalculatedDistances(
    calculatedDistances: CalculatedDistanceList,
  ): Promise<any> {
    return null;
  }
  @Post('addDispatchRecord')
  public async addDispatchRecord(dispatchRecord: DispatchRecord): Promise<any> {
    return null;
  }
  @Post('addDispatchRecords')
  public async addDispatchRecords(
    dispatchRecordList: DispatchRecordList,
  ): Promise<any> {
    return null;
  }
  @Post('addVehicleHeartbeat')
  public async addVehicleHeartbeat(
    vehicleHeartbeat: VehicleHeartbeat,
  ): Promise<any> {
    return null;
  }
  @Post('addVehicleArrival')
  public async addVehicleArrival(vehicleArrival: VehicleArrival): Promise<any> {
    return null;
  }
  @Post('addLocationRequest')
  public async addLocationRequest(
    locationRequest: LocationRequest,
  ): Promise<any> {
    return null;
  }
  @Post('addLocationResponse')
  public async addLocationResponse(
    locationResponse: LocationResponse,
  ): Promise<any> {
    return null;
  }
  @Post('addUserGeofenceEvent')
  public async addUserGeofenceEvent(
    userGeofenceEvent: UserGeofenceEvent,
  ): Promise<any> {
    return null;
  }
  @Post('addVehicleDeparture')
  public async addVehicleDeparture(
    vehicleDeparture: VehicleDeparture,
  ): Promise<any> {
    return null;
  }
  @Post('addAppError')
  public async addAppError(appError: AppError): Promise<any> {
    return null;
  }
  @Post('addAppErrors')
  public async addAppErrors(appErrors: AppErrors): Promise<any> {
    return null;
  }
  @Post('registerAssociation')
  public async registerAssociation(association: Association): Promise<any> {
    return null;
  }
  @Post('addRouteUpdateRequest')
  public async addRouteUpdateRequest(
    routeUpdateRequest: RouteUpdateRequest,
  ): Promise<any> {
    return null;
  }
  @Post('addVehicleMediaRequest')
  public async addVehicleMediaRequest(
    vehicleMediaRequest: VehicleMediaRequest,
  ): Promise<any> {
    return null;
  }
  @Post('sendVehicleUpdateMessage')
  public async sendVehicleUpdateMessage(
    associationId: string,
    vehicleId: string,
  ): Promise<any> {
    return null;
  }
  @Post('generateFakeAssociation')
  public async generateFakeAssociation(
    testCellphoneNumber: string,
    firstName: string,
    lastName: string,
    associationName: string,
    email: string,
  ): Promise<any> {
    return null;
  }
  @Post('generateFakeVehicles')
  public async generateFakeVehicles(
    associationId: string,
    number: number,
  ): Promise<any> {
    return null;
  }
  @Post('deleteRoutePoint')
  public async deleteRoutePoint(routePointId: string): Promise<any> {
    return null;
  }

  @Post('upLoadExampleFiles')
  @UseInterceptors(FileInterceptor('document'))
  async upLoadExampleFiles(
    @UploadedFile() userCSV: Express.Multer.File,
    @UploadedFile() vehicleCSV: Express.Multer.File,
    @UploadedFile() userJSON: Express.Multer.File,
    @UploadedFile() vehicleJSON: Express.Multer.File,
    associationId: string,
  ): Promise<any> {
    if (userCSV) {
      const { originalname, filename, size } = userCSV;
      // Process the uploaded file here
      // ...

      return { message: 'File uploaded successfully' };
    }
    //
    if (vehicleCSV) {
      const { originalname, filename, size } = vehicleCSV;

      return { message: 'File uploaded successfully' };
    }
    if (userJSON) {
      const { originalname, filename, size } = userJSON;

      return { message: 'File uploaded successfully' };
    }
    if (vehicleJSON) {
      const { originalname, filename, size } = vehicleJSON;

      return { message: 'File uploaded successfully' };
    }
  }
  @Post('addSouthAfricanCitiesToDB')
  public async addSouthAfricanCitiesToDB(): Promise<any> {
    return null;
  }
  @Post('checkDatabaseTotals')
  public async checkDatabaseTotals(): Promise<any> {
    return null;
  }
  @Post('generateTranslations')
  public async generateTranslations(): Promise<any> {
    return null;
  }
  @Post('generateInputStrings')
  public async generateInputStrings(
    inputStrings: TranslationInput[],
  ): Promise<any> {
    return null;
  }
  @Post('createDartFile')
  public async createDartFile(): Promise<any> {
    return null;
  }
  @Post('addVehiclePhoto')
  public async addVehiclePhoto(vehiclePhoto: VehiclePhoto): Promise<any> {
    return null;
  }
  @Post('addVehicleVideo')
  public async addVehicleVideo(vehiclePhoto: VehicleVideo): Promise<any> {
    return null;
  }
  @Post('addAmbassadorCheckIn')
  public async addAmbassadorCheckIn(checkIn: AmbassadorCheckIn): Promise<any> {
    return null;
  }
  @Post('changeFakeVehicleOwner')
  public async changeFakeVehicleOwner(userId: string): Promise<any> {
    return null;
  }
  @Post('generateHeartbeats')
  public async generateHeartbeats(
    associationId: string,
    numberOfCars: number,
    intervalInSeconds: number,
  ): Promise<any> {
    return null;
  }
  @Post('addAssociationToken')
  public async addAssociationToken(
    associationId: string,
    userId: string,
    token: string,
  ): Promise<any> {
    return null;
  }
  @Post('generateRouteHeartbeats')
  public async generateRouteHeartbeats(
    request: GenerationRequest,
  ): Promise<any> {
    return null;
  }
  @Post('buildTimeSeries')
  public async buildTimeSeries(
    collectionName: string,
    metaField: string,
    timeField: string,
  ): Promise<any> {
    return null;
  }
  @Post('addHeartbeatTimeSeries')
  public async addHeartbeatTimeSeries(
    associationId: string,
    vehicleId: string,
    vehicleReg: string,
  ): Promise<any> {
    return null;
  }
  @Post('addRouteAssignments')
  public async addRouteAssignments(
    assignments: RouteAssignmentList,
  ): Promise<any> {
    return null;
  }
  @Post('fixOwnerToPassengerCounts')
  public async fixOwnerToPassengerCounts(
    userId: string,
    ownerId: string,
    ownerName: string,
  ): Promise<any> {
    return null;
  }
  @Post('recreateAllQRCodes')
  public async recreateAllQRCodes(associationId: string): Promise<any> {
    return null;
  }
  @Post('addLandmark')
  public async addLandmark(landmark: Landmark): Promise<any> {
    return null;
  }
  @Post('sendVehicleMediaRequestMessage')
  public async sendVehicleMediaRequestMessage(
    request: VehicleMediaRequest,
  ): Promise<any> {
    return null;
  }
  @Post('generateFakeVehiclesFromFile')
  public async generateFakeVehiclesFromFile(
    associationId: string,
  ): Promise<any> {
    return null;
  }
  @Post('addCountriesStatesCitiesToDB')
  public async addCountriesStatesCitiesToDB(): Promise<any> {
    return null;
  }
  @Post('addAmbassadorPassengerCount')
  public async addAmbassadorPassengerCount(
    count: AmbassadorPassengerCount,
  ): Promise<any> {
    return null;
  }
  @Post('generateVehicleRouteHeartbeats')
  public async generateVehicleRouteHeartbeats(
    vehicleId: string,
    routeId: string,
    startDate: string,
    intervalInSeconds: number,
  ): Promise<any> {
    return null;
  }
  @Post('generateRouteCommuterRequests')
  public async generateRouteCommuterRequests(routeId: string): Promise<any> {
    return null;
  }
  @Post('generateAmbassadorPassengerCounts')
  public async generateAmbassadorPassengerCounts(
    associationId: string,
    numberOfCars: number,
    intervalInSeconds: number,
  ): Promise<any> {
    return null;
  }
  @Post('generateRoutePassengerCounts')
  public async generateRoutePassengerCounts(
    routeId: string,
    numberOfCars: number,
    intervalInSeconds: number,
  ): Promise<any> {
    return null;
  }
  @Post('generateRouteDispatchRecords')
  public async generateRouteDispatchRecords(
    request: GenerationRequest,
  ): Promise<any> {
    return null;
  }
}
