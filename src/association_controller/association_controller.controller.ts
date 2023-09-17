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
import { ExampleFile } from 'src/data/models/ExampleFile';
import { RegistrationBag } from 'src/data/models/RegistrationBag';
import { SettingsModel } from 'src/data/models/SettingsModel';
import { User } from 'src/data/models/User';
import { AppError } from 'src/data/models/AppError';
import { MyFirebaseService } from 'src/services/FirebaseService';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as mime from 'mime';
import { Vehicle } from 'src/data/models/Vehicle';
import { MyUtils } from 'src/my-utils/my-utils';
const mm = '🍐🍐🍐 AssociationController';

@Controller('api/v1')
export class AssociationController {
  constructor(
    private readonly associationService: AssociationService,
    private readonly fbService: MyFirebaseService,
  ) {}

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
    @Query() query: { associationId: string },
  ): Promise<AppError[]> {
    Logger.log(
      `${mm} ... getAssociationAppErrors
        starting, id: ${query.associationId} ...`,
    );
    return await this.associationService.getAssociationAppErrors(
      query.associationId,
    );
  }

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
  @Get('getAssociationVehiclesZippedFile')
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
    return null;
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
    return this.associationService.addAppError(error);
  }
  @Post('addAppErrors')
  public async addAppErrors(@Body() errors: AppErrors): Promise<AppError[]> {
    return [];
  }

  @Get('downloadExampleUsersFile')
  public async downloadExampleUsersFile(): Promise<File> {
    return null;
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
  @Get('getExampleFiles')
  public async getExampleFiles(): Promise<ExampleFile[]> {
    return [];
  }
  @Post('upLoadExampleFiles')
  public async upLoadExampleFiles(files: File[]): Promise<ExampleFile[]> {
    return [];
  }
}
