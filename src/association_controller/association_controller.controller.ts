/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { AssociationService } from 'src/association_service/association_service.service';
import { AppErrors } from 'src/data/helpers/AppErrors';
import { Association } from 'src/data/models/Association';
import { RegistrationBag } from 'src/data/models/RegistrationBag';
import { SettingsModel } from 'src/data/models/SettingsModel';
import { User } from 'src/data/models/User';
import { AppError } from 'src/data/models/AppError';
import { Response } from 'express';
import { Vehicle } from 'src/data/models/Vehicle';
import { MyUtils } from 'src/my-utils/my-utils';
import { Country } from 'src/data/models/Country';
import { TranslationInput } from 'src/data/helpers/TranslationInput';
import { TranslationBag } from 'src/data/models/TranslationBag';
import { TranslationService } from 'src/translation/translation.service';
import { UserGeofenceEvent } from 'src/data/models/UserGeofenceEvent';
import { UserService } from 'src/services/UserService';
import { VehicleMediaRequest } from 'src/data/models/VehicleMediaRequest';
import { MediaService } from 'src/services/MediaService';
import { CityService } from 'src/services/CityService';
import { City } from 'src/data/models/City';
const mm = '🍐🍐🍐 AssociationController';

@Controller('api/v1')
export class AssociationController {
  constructor(
    private readonly associationService: AssociationService,
    private readonly txService: TranslationService,
    private readonly userService: UserService,
    private readonly mediaService: MediaService,
    private readonly cityService: CityService,
  ) {}

  @Get('getCountries')
  async getCountries(): Promise<Country[]> {
    return await this.associationService.getCountries();
  }
  @Get('getAssociations')
  async getAssociations(): Promise<Association[]> {
    return await this.associationService.getAssociations();
  }
  @Get('getAllSettingsModels')
  async getAllSettingsModels(): Promise<SettingsModel[]> {
    return await this.associationService.getAllSettingsModels();
  }
  @Get('getAssociationUsers')
  async getAssociationUsers(
    @Query() query: { associationId: string },
  ): Promise<User[]> {
    Logger.log(
      `${mm} ... getAssociationUsers starting, id: ${query.associationId} ...`,
    );
    return await this.associationService.getAssociationUsers(
      query.associationId,
    );
  }
  @Get('getAssociationVehicles')
  async getAssociationVehicles(
    @Query() query: { associationId: string },
  ): Promise<Vehicle[]> {
    Logger.log(
      `${mm} ... getAssociationVehicles starting, id: ${query.associationId} ...`,
    );
    return await this.associationService.getAssociationVehicles(
      query.associationId,
    );
  }
  @Get('getAssociationVehicleMediaRequests')
  async getAssociationVehicleMediaRequests(
    @Query() query: { associationId: string; startDate: string },
  ): Promise<VehicleMediaRequest[]> {
    return await this.mediaService.getAssociationVehicleMediaRequests(
      query.associationId,
      query.startDate,
    );
  }
  @Get('getCountryCities')
  async getCountryCities(
    @Query() query: { countryId: string },
  ): Promise<City[]> {
    return await this.cityService.getCountryCities(query.countryId);
  }
  @Get('getAssociationById')
  public async getAssociationById(
    @Query() query: { associationId: string },
  ): Promise<Association> {
    return this.associationService.getAssociationById(query.associationId);
  }
  //getAssociationAppErrors
  @Get('getQRCode')
  public async getQRCode(
    @Query() query: { input: string; prefix: string; size: number },
  ): Promise<string> {
    return await MyUtils.createQRCodeAndUploadToCloudStorage(
      query.input,
      query.prefix,
      query.size,
    );
  }
  @Get('getAssociationAppErrors')
  public async getAssociationAppErrors(
    @Query() query: { associationId: string; startDate: string },
  ): Promise<AppError[]> {
    return await this.associationService.getAssociationAppErrors(
      query.associationId,
      query.startDate,
    );
  }
  @Get('getAppErrors')
  public async getAppErrors(
    @Query() query: { startDate: string },
  ): Promise<AppError[]> {
    return await this.associationService.getAppErrors(query.startDate);
  }
  @Get('getAssociationSettings')
  public async getAssociationSettingsModels(
    @Query() query: { associationId: string },
  ): Promise<SettingsModel[]> {
    Logger.log(
      `${mm} ... getAssociationSettingsModels
        starting, id: ${query.associationId} ...`,
    );
    return await this.associationService.getAssociationSettingsModels(
      query.associationId,
    );
  }
  @Get('downloadExampleVehiclesFile')
  public async downloadExampleVehiclesFile(): Promise<File> {
    return null;
  }
  //getCountryCitiesZippedFile
  @Get('getVehiclesZippedFile')
  public async getAssociationVehiclesZippedFile(
    @Query() query: { associationId: string },
    @Res() res: Response,
  ) {
    try {
      const fileName =
        await this.associationService.getAssociationVehiclesZippedFile(
          query.associationId,
        );
      this.sendFile(fileName, res);
    } catch (error) {
      Logger.log(`${mm} 👿👿👿👿 Error getting vehicle zipped file:`, error);
      res.status(500).send(`${mm} 👿👿👿 Error downloading file: ${error}`);
    }
  }
  @Get('getOwnerVehiclesZippedFile')
  public async getOwnerVehiclesZippedFile(
    @Query() query: { userId: string },
    @Res() res: Response,
  ) {
    try {
      const fileName = await this.associationService.getOwnerVehiclesZippedFile(
        query.userId,
      );
      this.sendFile(fileName, res);
    } catch (error) {
      Logger.log(`${mm} 👿👿👿👿 Error getting vehicle zipped file:`, error);
      res.status(500).send(`${mm} 👿👿👿 Error downloading file: ${error}`);
    }
  }
  @Get('getCountryCitiesZippedFile')
  public async getCountryCitiesZippedFile(
    @Query() query: { countryId: string },
    @Res() res: Response,
  ) {
    try {
      const fileName = await this.associationService.getCountryCitiesZippedFile(
        query.countryId,
      );
      this.sendFile(fileName, res);
    } catch (error) {
      Logger.log(`${mm} 👿👿👿👿 Error getting vehicle zipped file:`, error);
      res.status(500).send(`${mm} 👿👿👿 Error downloading file: ${error}`);
    }
  }
  @Get('downloadExampleUserCSVFile')
  public async downloadExampleUserCSVFile(@Res() res: Response) {
    try {
      const fileName =
        await this.associationService.downloadExampleUserCSVFile();
      this.sendFile(fileName, res);
    } catch (error) {
      Logger.log(`${mm} 👿👿👿👿 Error downloading file:`, error);
      res
        .status(500)
        .send(`${mm} 👿👿👿 Error downloading example file: ${error}`);
    }
  }
  @Get('downloadExampleUserJSONFile')
  public async downloadExampleUserJSONFile(@Res() res: Response) {
    try {
      const fileName =
        await this.associationService.downloadExampleUserJSONFile();
      this.sendFile(fileName, res);
    } catch (error) {
      Logger.log(`${mm} 👿👿👿👿 Error downloading file:`, error);
      res
        .status(500)
        .send(`${mm} 👿👿👿 Error downloading example file: ${error}`);
    }
  }
  @Get('downloadExampleVehicleCSVFile')
  public async downloadExampleVehicleCSVFile(@Res() res: Response) {
    try {
      const fileName =
        await this.associationService.downloadExampleVehicleCSVFile();
      this.sendFile(fileName, res);
    } catch (error) {
      Logger.log(`${mm} 👿👿👿👿 Error downloading file:`, error);
      res
        .status(500)
        .send(`${mm} 👿👿👿 Error downloading example file: ${error}`);
    }
  }
  @Get('downloadExampleVehicleJSONFile')
  public async downloadExampleVehicleJSONFile(@Res() res: Response) {
    try {
      const fileName =
        await this.associationService.downloadExampleVehicleJSONFile();
      this.sendFile(fileName, res);
    } catch (error) {
      Logger.log(`${mm} 👿👿👿👿 Error downloading file:`, error);
      res
        .status(500)
        .send(`${mm} 👿👿👿 Error downloading example file: ${error}`);
    }
  }
  private sendFile(fileName: string, res: Response<any, Record<string, any>>) {
    Logger.log(`${mm} ... about to return: ${fileName}`);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=users.csv`);
    // Send the file as the response
    res.sendFile(fileName);
  }

  @Post('registerAssociation')
  public async registerAssociation(
    @Body() association: Association,
  ): Promise<RegistrationBag> {
    return await this.associationService.registerAssociation(association);
  }
  @Post('addUserGeofenceEvent')
  public async addUserGeofenceEvent(
    @Body() userGeofence: UserGeofenceEvent,
  ): Promise<UserGeofenceEvent> {
    return await this.userService.addUserGeofenceEvent(userGeofence);
  }
  @Post('translateStrings')
  public async translateStrings(
    @Body() inputs: TranslationInput[],
  ): Promise<TranslationBag[]> {
    return this.txService.translateStrings(inputs);
  }
  @Post('addSettingsModel')
  public async addSettingsModel(
    @Body() model: SettingsModel,
  ): Promise<SettingsModel> {
    return await this.associationService.addSettingsModel(model);
  }
  @Post('addAppError')
  public async addAppError(@Body() error: AppError): Promise<AppError> {
    Logger.log(`${mm} .. adding AppError: ${error}`);
    return await this.associationService.addAppError(error);
  }
  @Post('addAppErrors')
  public async addAppErrors(@Body() errorList: AppErrors): Promise<AppError[]> {
    return await this.associationService.addAppErrors(errorList);
  }

  public async generateFakeAssociation(
    associationName: string,
    email: string,
    testCellphoneNumber: string,
    firstName: string,
    lastName: string,
  ): Promise<RegistrationBag> {
    return this.associationService.generateFakeAssociation(
      associationName,
      email,
      testCellphoneNumber,
      firstName,
      lastName,
    );
  }
}
