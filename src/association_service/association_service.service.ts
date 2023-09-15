/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Association } from 'src/data/models/Association';
import { SettingsModel } from 'src/data/models/SettingsModel';
import { ExampleFile } from 'src/data/models/ExampleFile';
import { RegistrationBag } from 'src/data/models/RegistrationBag';
import { AppErrors } from 'src/data/helpers/AppErrors';
import { User } from 'src/data/models/User';
import { AppError } from 'src/data/models/AppError';

const mm = '🍎🍎🍎 AssociationService: 🍎🍎🍎';
@Injectable()
export class AssociationService {
  constructor(
    private configService: ConfigService,
    //
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,

    @InjectModel(AppError.name)
    private appErrorModel: mongoose.Model<AppError>,

    @InjectModel(Association.name)
    private associationModel: mongoose.Model<Association>,

    @InjectModel(SettingsModel.name)
    private settingsModel: mongoose.Model<SettingsModel>,
  ) {}
  //----------------------------------------------------------------
  public async getAssociations(): Promise<Association[]> {
    Logger.log(`${mm} ... getAssociations starting ...`);
    const list = await this.associationModel.find({});
    Logger.log(`${mm} ... getAssociations found: ${list.length} ...`);
    return list;
  }
  public async getAssociationUsers(associationId: string): Promise<User[]> {
    Logger.log(
      `${mm} ... getAssociationUsers starting, id: ${associationId} ...`,
    );
    const list = await this.userModel.find({ associationId: associationId });
    Logger.log(`${mm} ... getAssociationUsers found: ${list.length} ...`);
    return list;
  }
  public async getAssociationById(associationId: string): Promise<Association> {
    return null;
  }
  public async getAssociationSettingsModels(
    associationId: string,
  ): Promise<SettingsModel[]> {
    const list = await this.settingsModel.find({
      associationId: associationId,
    });
    Logger.log(
      `${mm} ... getAssociationSettingsModels found: ${list.length} ...`,
    );
    return list;
  }
  public async getAllSettingsModels(): Promise<SettingsModel[]> {
    const list = await this.settingsModel.find({});
    Logger.log(`${mm} ... getAllSettingsModels found: ${list.length} ...`);
    return list;
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
    Logger.log(`adding addSettingsModel${model}`);

    return await this.settingsModel.create(model);
  }
  public async addAppError(error: AppError): Promise<AppError> {
    Logger.log(`adding AppError${error}`);
    return await this.appErrorModel.create(error);
  }
  public async addAppErrors(errors: AppErrors): Promise<AppError[]> {
    return [];
  }
  public async getAssociationAppErrors(
    associationId: string,
  ): Promise<AppError[]> {
    Logger.log(`${mm} ... getAssociationAppErrors, id: ${associationId}`);
    return this.appErrorModel.find({ associationId: associationId }).exec();
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
