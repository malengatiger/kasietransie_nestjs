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
import * as fs from 'fs';
import * as path from 'path';
import admin from 'firebase-admin';
import { Vehicle } from 'src/data/models/Vehicle';
import { FileArchiverService } from 'src/my-utils/zipper';
import { Country } from 'src/data/models/Country';
import { UserService } from 'src/services/UserService';
import { CityService } from 'src/services/CityService';
import { MessagingService } from '../messaging/messaging.service';
import { AssociationToken } from '../data/models/AssociationToken';
import { Commuter } from '../data/models/Commuter';

const mm = '🍎🍎🍎 AssociationService: 🍎🍎🍎';

@Injectable()
export class AssociationService {
  constructor(
    private configService: ConfigService,
    private archiveService: FileArchiverService,
    private userService: UserService,
    private cityService: CityService,
    private messagingService: MessagingService,
    //
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    @InjectModel(Commuter.name)
    private commuterModel: mongoose.Model<Commuter>,
    @InjectModel(AppError.name)
    private appErrorModel: mongoose.Model<AppError>,
    @InjectModel(Association.name)
    private associationModel: mongoose.Model<Association>,
    @InjectModel(ExampleFile.name)
    private exampleFileModel: mongoose.Model<ExampleFile>,
    @InjectModel(Vehicle.name)
    private vehicleModel: mongoose.Model<Vehicle>,
    @InjectModel(Country.name)
    private countryModel: mongoose.Model<Country>,
    @InjectModel(AssociationToken.name)
    private associationTokenModel: mongoose.Model<AssociationToken>,
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

  public async getAssociationVehicles(
    associationId: string,
  ): Promise<Vehicle[]> {
    Logger.log(
      `${mm} ... getAssociationVehicles starting, id: ${associationId} ...`,
    );
    const list = await this.vehicleModel.find({ associationId: associationId });
    Logger.log(`${mm} ... getAssociationVehicles found: ${list.length} ...`);
    return list;
  }

  public async getAssociationVehiclesZippedFile(
    associationId: string,
  ): Promise<string> {
    Logger.log(
      `${mm} ... getAssociationVehicles starting, id: ${associationId} ...`,
    );
    const list = await this.getAssociationVehicles(associationId);
    const json = JSON.stringify(list);

    const file = await this.archiveService.zip([{ content: json }]);
    Logger.log(`${mm} ... getAssociationVehicles found: ${list.length} ...`);
    return file;
  }

  public async getOwnerVehiclesZippedFile(userId: string): Promise<string> {
    const list = await this.vehicleModel.find({ ownerId: userId });
    const json = JSON.stringify(list);

    const file = await this.archiveService.zip([{ content: json }]);
    Logger.log(
      `${mm} ... getOwnerVehiclesZippedFile found: ${list.length} ...`,
    );
    return file;
  }

  public async getCountryCitiesZippedFile(countryId: string): Promise<string> {
    Logger.log(
      `${mm} ... getCountryCitiesZippedFile starting, id: ${countryId} ...`,
    );
    const list = await this.cityService.getCountryCities(countryId);
    const json = JSON.stringify(list);

    const file = await this.archiveService.zip([{ content: json }]);
    Logger.log(
      `${mm} ... getCountryCitiesZippedFile found: ${list.length} ...`,
    );
    return file;
  }

  public async getAssociationById(associationId: string): Promise<Association> {
    return await this.associationModel.findOne({
      associationId: associationId,
    });
  }

  public async getCountries(): Promise<Country[]> {
    return await this.countryModel.find({});
  }

  T;

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

  public async downloadExampleUserCSVFile(): Promise<string> {
    Logger.log(`${mm} .... downloadExampleUserCSVFile ...................`);
    const fileName = `users.csv`;
    return this.downloadFileFromStorage(fileName);
  }

  public async downloadExampleUserJSONFile(): Promise<string> {
    Logger.log(`${mm} .... downloadExampleUserJSONFile ...................`);
    const fileName = `users.json`;
    return this.downloadFileFromStorage(fileName);
  }

  public async downloadExampleVehicleCSVFile(): Promise<string> {
    Logger.log(`${mm} .... downloadExampleVehicleCSVFile ...................`);
    const fileName = `vehicles.csv`;
    return this.downloadFileFromStorage(fileName);
  }

  public async downloadExampleVehicleJSONFile(): Promise<string> {
    Logger.log(`${mm} .... downloadExampleVehicleJSONFile ...................`);
    const fileName = `vehicles.json`;
    return this.downloadFileFromStorage(fileName);
  }

  async downloadFileFromStorage(fileName: string): Promise<string> {
    const tempDir = path.join(__dirname, '..', 'tempFiles');
    const tempFilePath = path.join(tempDir, fileName);
    const storage = admin.storage();
    const folder = process.env.BUCKET_FOLDER;

    try {
      // Create the temporary directory if it doesn't exist
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      const csFile = storage.bucket().file(`${folder}/${fileName}`);
      Logger.log(
        `${mm} Downloading file, csFile: ${csFile.cloudStorageURI} tempFilePath: ${tempFilePath} .....`,
      );

      const contents = await csFile.download();
      const fileContent = contents[0];
      Logger.log(
        `${mm} ${fileContent}  🔵🔵🔵 fileContent.byteLength: ${fileContent.byteLength}`,
      );
      //Create a writable stream to write the file content
      const writeStream = fs.createWriteStream(tempFilePath);
      writeStream.write(fileContent);
      writeStream.end();

      Logger.log(`${mm} x marks the spot, tempFilePath: ${tempFilePath}`);
      return tempFilePath;
    } catch (error) {
      Logger.log(`${mm} Error downloading file: ${error}`);
      throw new Error('Failed to download file');
    }
  }

  //
  private generateUniqueId(): string {
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substring(2, 8);
    return `${timestamp}_${randomString}`;
  }

  public async registerAssociation(
    association: Association,
  ): Promise<RegistrationBag> {
    Logger.log(`${mm} registerAssociation ...`);
    const u = new User();
    u.firstName = association.adminUserFirstName;
    u.lastName = association.adminUserLastName;
    u.email = association.adminEmail;
    u.cellphone = association.adminCellphone;
    u.countryId = association.countryId;
    u.countryName = association.countryName;
    u.dateRegistered = Date.now().toString();

    const user = await this.userService.createUser(u);
    association.userId = user.userId;
    const ass = await this.associationModel.create(association);
    const s = new SettingsModel();
    s.created = Date.now().toString();
    s.associationId = ass.associationId;
    s.commuterGeoQueryRadius = 50;
    s.commuterGeofenceRadius = 200;
    s.commuterSearchMinutes = 30;
    s.distanceFilter = 25;
    s.geofenceRadius = 200;
    s.heartbeatIntervalSeconds = 600;
    s.locale = 'en';
    s.loiteringDelay = 60;
    s.refreshRateInSeconds = 600;
    s.themeIndex = 0;
    s.vehicleGeoQueryRadius = 100;
    s.vehicleSearchMinutes = 30;
    const settings = await this.settingsModel.create(s);
    const bag = new RegistrationBag();
    bag.association = ass;
    bag.settings = settings;
    bag.user = user;
    if (ass.countryId) {
      const c = await this.countryModel.find({ countryId: ass.countryId });
      if (c.length > 0) {
        bag.country = c[0];
      }
    }

    Logger.log(`association registered: ${ass.associationName}`);
    return bag;
  }

  public async addSettingsModel(model: SettingsModel): Promise<SettingsModel> {
    Logger.log(`adding addSettingsModel${model}`);
    return await this.settingsModel.create(model);
  }

  public async addAssociationToken(
    associationId: string,
    userId: string,
    token: string,
  ): Promise<AssociationToken> {
    const at: AssociationToken = new AssociationToken();
    at.associationId = associationId;
    at.userId = userId;
    at.token = token;
    await this.associationTokenModel.deleteOne({
      associationId: associationId,
      userId: userId,
    });
    return await this.associationTokenModel.create(at);
  }

  public async getAssociationAppErrors(
    associationId: string,
    startDate: string,
  ): Promise<AppError[]> {
    return this.appErrorModel
      .find({
        associationId: associationId,
        created: { $gte: startDate },
      })
      .sort({ created: -1 });
  }
  public async getRandomCommuters(limit: number): Promise<Commuter[]> {
    return this.commuterModel.find({}).limit(limit);
  }

  public async getAppErrors(startDate: string): Promise<AppError[]> {
    return this.appErrorModel
      .find({
        created: { $gte: startDate },
      })
      .sort({ created: -1 });
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
    return this.exampleFileModel.find({});
  }

  public async upLoadExampleFiles(files: File[]): Promise<ExampleFile[]> {
    return [];
  }
}
