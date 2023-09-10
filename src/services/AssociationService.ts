/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AppErrors } from 'src/helper_models/AppErrors';
import { AppError } from 'src/models/AppError';
import { Association } from 'src/models/Association';
import { ExampleFile } from 'src/models/ExampleFile';
import { RegistrationBag } from 'src/models/RegistrationBag';
import { SettingsModel } from 'src/models/SettingsModel';

const mm = 'AssociationService';

@Injectable()
export class AssociationService {
  constructor(
    private configService: ConfigService,
    @InjectModel(AppError.name)
    private appErrorModel: mongoose.Model<AppError>,

    @InjectModel(Association.name)
    private associationModel: mongoose.Model<Association>,

    @InjectModel(SettingsModel.name)
    private settingsModelModel: mongoose.Model<SettingsModel>,
  ) {}

  public async getAssociationSettingsModels(
    associationId: string,
  ): Promise<SettingsModel[]> {
    return [];
  }
  public async downloadExampleVehiclesFile(): Promise<File> {
    return null;
  }
  public async registerAssociation(
    association: Association,
  ): Promise<RegistrationBag> {
    return null;
  }
  public async addSettingsModel(model: SettingsModel): Promise<SettingsModel> {
    return null;
  }
  public async addAppError(error: AppError): Promise<AppError> {
    return null;
  }
  public async addAppErrors(errors: AppErrors): Promise<AppError[]> {
    return [];
  }
  public async getAssociationAppErrors(
    associationId: string,
  ): Promise<AppError[]> {
    return [];
  }
  public async getAssociations(): Promise<Association[]> {
    return [];
  }
  public async getAssociationById(associationId: string): Promise<Association> {
    return null;
  }
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
    return null;
  }
  public async getExampleFiles(): Promise<ExampleFile[]> {
    return [];
  }
  public async upLoadExampleFiles(files: File[]): Promise<ExampleFile[]> {
    return [];
  }
}
