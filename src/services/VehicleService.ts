/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Vehicle } from 'src/models/Vehicle';
import { Association } from 'src/models/Association';
import { User } from 'src/models/User';
import { Route } from 'src/models/Route';
import { RouteAssignmentList } from 'src/helper_models/RouteAssignmentList';
import { RouteAssignment } from 'src/models/RouteAssignment';
import { RoutePoint } from 'src/models/RoutePoint';
import { VehicleHeartbeat } from 'src/models/VehicleHeartbeat';

const mm = 'VehicleService';

@Injectable()
export class VehicleService {
  constructor(
    private configService: ConfigService,
    @InjectModel(Vehicle.name)
    private vehicleModel: mongoose.Model<Vehicle>,

    @InjectModel(Association.name)
    private associationModel: mongoose.Model<Association>,

    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,

    @InjectModel(File.name)
    private fileModel: mongoose.Model<File>,

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
    return null;
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
    return [];
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
  public async getAssociationVehicles(
    associationId: string,
    page: number,
  ): Promise<Vehicle[]> {
    return [];
  }
  public async getOwnerVehicles(
    userId: string,
    page: number,
  ): Promise<Vehicle[]> {
    return [];
  }
  public async updateVehicleQRCode(vehicle: Vehicle): Promise<number> {
    return null;
  }
  public async recreateAllQRCodes(associationId: string): Promise<number> {
    return null;
  }
  public async importVehiclesFromJSON(
    file: File,
    associationId: string,
  ): Promise<Vehicle[]> {
    return [];
  }
  public async importVehiclesFromCSV(
    file: File,
    associationId: string,
  ): Promise<Vehicle[]> {
    return [];
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
  public async getVehiclesZippedFile(associationId: string): Promise<File> {
    return null;
  }
}
