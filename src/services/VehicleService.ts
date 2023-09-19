/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Vehicle } from 'src/data/models/Vehicle';
import { Association } from 'src/data/models/Association';
import { User } from 'src/data/models/User';
import { Route } from 'src/data/models/Route';
import { RouteAssignmentList } from 'src/data/helpers/RouteAssignmentList';
import { RouteAssignment } from 'src/data/models/RouteAssignment';
import { RoutePoint } from 'src/data/models/RoutePoint';
import { VehicleHeartbeat } from 'src/data/models/VehicleHeartbeat';
import csvParser from 'csv-parser';
import { AssociationService } from 'src/association_service/association_service.service';
import * as fs from 'fs';
import { randomUUID } from 'crypto';
import { MyUtils } from 'src/my-utils/my-utils';

const mm = 'VehicleService';

@Injectable()
export class VehicleService {
  constructor(
    private configService: ConfigService,
    private associationService: AssociationService,
    @InjectModel(Vehicle.name)
    private vehicleModel: mongoose.Model<Vehicle>,

    @InjectModel(Association.name)
    private associationModel: mongoose.Model<Association>,

    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,

    @InjectModel(RouteAssignment.name)
    private assignModel: mongoose.Model<RouteAssignment>,

    @InjectModel(Route.name)
    private routeModel: mongoose.Model<Route>,
  ) {}

  public async findOwnerVehiclesByLocationAndTime(
    userId: string,
    latitude: number,
    longitude: number,
    minutes: number,
  ): Promise<VehicleHeartbeat[]> {
    return [];
  }
  public async findAssociationVehiclesByLocationAndTime(
    associationId: string,
    latitude: number,
    longitude: number,
    minutes: number,
  ): Promise<VehicleHeartbeat[]> {
    return [];
  }
  public async generateFakeVehiclesFromFile(
    associationId: string,
  ): Promise<Vehicle[]> {
    return [];
  }
  public async getPoints(route: Route): Promise<RoutePoint[]> {
    return [];
  }
  public async buildUser(
    cellphone: string,
    lastName: string,
    firstName: string,
    ass: Association,
    responses: [],
  ): Promise<User> {
    return null;
  }
  public async insertCar(
    resultVehicles: Vehicle[],
    responses: [],
    existingUser: User,
    vehicle: Vehicle,
    result: number,
  ): Promise<void> {
    return null;
  }
  public async addVehicle(vehicle: Vehicle): Promise<Vehicle> {
    const url = await MyUtils.createQRCodeAndUploadToCloudStorage(
      JSON.stringify(vehicle),
      vehicle.vehicleReg,
      2,
    );
    vehicle.qrCodeUrl = url;
    return await this.vehicleModel.create(vehicle);
  }
  public async getCars(
    list: Vehicle[],
    numberOfCars: number,
  ): Promise<Vehicle[]> {
    return [];
  }
  public async getVehicleReg(): Promise<string> {
    return null;
  }
  public async getOwnerName(): Promise<string> {
    return null;
  }
  public async getSortedIndices(points: RoutePoint[]): Promise<number[]> {
    return [];
  }
  public async createVehicleQRCode(car: Vehicle): Promise<number> {
    return null;
  }
  public async processVehiclesFromFile(
    association: Association,
    vehiclesFromJSONFile: Vehicle[],
  ): Promise<[]> {
    return [];
  }
  public async createUserAndVehicles(
    ass: Association,
    resultVehicles: Vehicle[],
    cellphone: string,
    lastName: string,
    firstName: string,
    vehicles: Vehicle[],
  ): Promise<[]> {
    return [];
  }
  public async getBaseVehicle(
    associationId: string,
    associationName: string,
  ): Promise<Vehicle> {
    return null;
  }
  public async addRouteAssignments(
    list: RouteAssignmentList,
  ): Promise<RouteAssignment[]> {
    return await this.assignModel.create(list.assignments);
  }
  public async getVehicleRouteAssignments(
    vehicleId: string,
  ): Promise<RouteAssignment[]> {
    return [];
  }
  public async getRouteAssignments(
    routeId: string,
  ): Promise<RouteAssignment[]> {
    return [];
  }
  public async generateHeartbeats(
    associationId: string,
    numberOfCars: number,
    intervalInSeconds: number,
  ): Promise<VehicleHeartbeat[]> {
    return [];
  }
  public async generateRouteHeartbeats(
    routeId: string,
    numberOfCars: number,
    intervalInSeconds: number,
  ): Promise<VehicleHeartbeat[]> {
    return [];
  }
  public async updateVehicle(vehicle: Vehicle): Promise<Vehicle> {
    return null;
  }

  public async getOwnerVehicles(
    userId: string,
    page: number,
  ): Promise<Vehicle[]> {
    return await this.vehicleModel
      .find({ ownerId: userId })
      .sort({ vehicleReg: 1 });
  }
  public async updateVehicleQRCode(vehicle: Vehicle): Promise<number> {
    return null;
  }
  public async recreateAllQRCodes(associationId: string): Promise<number> {
    return null;
  }
  public async importVehiclesFromJSON(
    file: Express.Multer.File,
    associationId: string,
  ): Promise<Vehicle[]> {
    const ass = await this.associationService.getAssociationById(associationId);
    const cars: Vehicle[] = [];

    // Parse the JSON file and create User objects
    const jsonData = fs.readFileSync(file.path, 'utf-8');
    const jsonUsers = JSON.parse(jsonData);

    jsonUsers.forEach(async (data: any) => {
      const car: Vehicle = await this.buildCar(data, ass);
      cars.push(car);
    });

    // Save the parsed users to the database
    const uList = [];
    await this.processCars(cars, uList);

    return uList;
  }
  private async processCars(cars: Vehicle[], uList: any[]) {
    cars.forEach(async (data: Vehicle) => {
      const url = await MyUtils.createQRCodeAndUploadToCloudStorage(
        JSON.stringify(data),
        data.vehicleReg.replace(' ', ''),
        2,
      );
      data.qrCodeUrl = url;
      const c = await this.vehicleModel.create(data);
      uList.push(c);
    });
    Logger.log(`${uList.length} cars added`);
  }

  public async importVehiclesFromCSV(
    file: Express.Multer.File,
    associationId: string,
  ): Promise<Vehicle[]> {
    const ass = await this.associationService.getAssociationById(associationId);
    const cars: Vehicle[] = [];
    const pCars: Vehicle[] = [];

    fs.createReadStream(file.path)
      .pipe(csvParser())
      .on('data', async (data: any) => {
        const car: Vehicle = await this.buildCar(data, ass);
        cars.push(car);
      })
      .on('end', async () => {
        // Save the parsed users to the database
        await this.processCars(cars, pCars);
      });

    Logger.log(`${pCars.length} cars added`);
    return cars;
  }
  private async buildCar(data: any, ass: Association): Promise<Vehicle> {
    const car = {
      _partitionKey: null,
      _id: null,
      ownerId: null,
      cellphone: data.cellphone,
      vehicleId: randomUUID.toString(),
      associationId: ass.associationId,
      countryId: ass.countryId,
      ownerName: data.ownerName,
      associationName: ass.associationName,
      vehicleReg: data.vehicleReg,
      model: data.model,
      make: data.make,
      year: data.year,
      passengerCapacity: data.passengerCapacity,
      active: 0,
      created: Date.now().toString(),
      updated: null,
      dateInstalled: null,
      qrCodeUrl: null,
    };
    const prefix = data.vehicleReg.replace(' ', '');
    const url = await MyUtils.createQRCodeAndUploadToCloudStorage(
      JSON.stringify(car),
      prefix,
      2,
    );
    car.qrCodeUrl = url;
    return car;
  }

  public async generateFakeVehicles(
    associationId: string,
    number: number,
  ): Promise<Vehicle[]> {
    return [];
  }
  public async changeFakeVehicleOwner(userId: string): Promise<number> {
    return null;
  }
}
