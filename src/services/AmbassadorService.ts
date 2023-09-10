/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Vehicle } from 'src/models/Vehicle';
import { AmbassadorPassengerCount } from 'src/models/AmbassadorPassengerCount';
import { AmbassadorCheckIn } from 'src/models/AmbassadorCheckIn';
import { RouteLandmark } from 'src/models/RouteLandmark';
import { User } from 'src/models/User';

const mm = 'AmbassadorService';

@Injectable()
export class AmbassadorService {
  constructor(
    private configService: ConfigService,
    @InjectModel(Vehicle.name)
    private vehicleModel: mongoose.Model<Vehicle>,

    @InjectModel(AmbassadorPassengerCount.name)
    private ambassadorPassengerCountModel: mongoose.Model<AmbassadorPassengerCount>,

    @InjectModel(AmbassadorCheckIn.name)
    private ambassadorCheckInModel: mongoose.Model<AmbassadorCheckIn>,

    @InjectModel(RouteLandmark.name)
    private routeLandmarkModel: mongoose.Model<RouteLandmark>,
  ) {}

  public async getAssociationAmbassadorCheckIn(
    associationId: string,
    startDate: string,
  ): Promise<AmbassadorCheckIn[]> {
    return [];
  }
  public async getVehicleAmbassadorCheckIn(
    vehicleId: string,
    startDate: string,
  ): Promise<AmbassadorCheckIn[]> {
    return [];
  }
  public async getUserAmbassadorPassengerCounts(
    userId: string,
    startDate: string,
  ): Promise<AmbassadorPassengerCount[]> {
    return [];
  }
  public async getAssociationAmbassadorPassengerCounts(
    associationId: string,
    startDate: string,
  ): Promise<AmbassadorPassengerCount[]> {
    return [];
  }
  public async getVehicleAmbassadorPassengerCounts(
    vehicleId: string,
    startDate: string,
  ): Promise<AmbassadorPassengerCount[]> {
    return [];
  }
  public async addAmbassadorPassengerCount(
    count: AmbassadorPassengerCount,
  ): Promise<AmbassadorPassengerCount> {
    return null;
  }
  public async generateRoutePassengerCounts(
    routeId: string,
    numberOfCars: number,
    intervalInSeconds: number,
  ): Promise<AmbassadorPassengerCount[]> {
    return [];
  }
  public async getAmbassadorPassengerCount(
    users: User[],
    passengerCounts: AmbassadorPassengerCount[],
    vehicle: Vehicle,
    marks: RouteLandmark[],
    minutesAgo: Date,
    landmarkIndex: number,
    previousAPC: AmbassadorPassengerCount,
    mark: RouteLandmark,
  ): Promise<AmbassadorPassengerCount> {
    return null;
  }
  public async generateAmbassadorPassengerCounts(
    associationId: string,
    numberOfCars: number,
    intervalInSeconds: number,
  ): Promise<AmbassadorPassengerCount[]> {
    return [];
  }
  public async getCars(
    list: Vehicle[],
    numberOfCars: number,
  ): Promise<Vehicle[]> {
    return [];
  }
  public async getUserAmbassadorCheckIn(
    userId: string,
    startDate: string,
  ): Promise<AmbassadorCheckIn[]> {
    return [];
  }

  public async addAmbassadorCheckIn(
    count: AmbassadorPassengerCount,
    startDate: string,
  ): Promise<AmbassadorPassengerCount> {
    return null;
  }
  public async getRoutePassengerCounts(
    routeId: string,
    startDate: string,
  ): Promise<AmbassadorPassengerCount[]> {
    return [];
  }
  public async getCurrentPassengers(
    passengersIn: number,
    passengersOut: number,
    currentPassengers: number,
  ): Promise<number> {
    return null;
  }
}
