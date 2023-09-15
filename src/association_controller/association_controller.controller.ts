/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { AssociationService } from 'src/association_service/association_service.service';
import { AppErrors } from 'src/data/helpers/AppErrors';
import { Association } from 'src/data/models/Association';
import { ExampleFile } from 'src/data/models/ExampleFile';
import { RegistrationBag } from 'src/data/models/RegistrationBag';
import { SettingsModel } from 'src/data/models/SettingsModel';
import { User } from 'src/data/models/User';
import { AppError } from 'src/data/models/AppError';
const mm = '🍐🍐🍐 AssociationController';

@Controller('api/v1')
export class AssociationController {
  constructor(private readonly associationService: AssociationService) {}

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
  @Get('getAssociationById')
  public async getAssociationById(
    @Query() query: { associationId: string },
  ): Promise<Association> {
    return this.associationService.getAssociationById(query.associationId);
  }
  //getAssociationAppErrors

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
