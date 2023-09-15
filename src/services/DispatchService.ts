/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/data/models/User';
import { RouteLandmark } from 'src/data/models/RouteLandmark';
import { DispatchRecord } from 'src/data/models/DispatchRecord';
import { Vehicle } from 'src/data/models/Vehicle';
import { VehicleArrival } from 'src/data/models/VehicleArrival';
import { AmbassadorPassengerCount } from 'src/data/models/AmbassadorPassengerCount';
import { VehicleDeparture } from 'src/data/models/VehicleDeparture';
import { Route } from 'src/data/models/Route';
import { AssociationBag } from 'src/data/helpers/AssociationBag';
import { AssociationCounts } from 'src/data/helpers/AssociationCounts';
import { BigBag } from 'src/data/helpers/BigBag';
import { CounterBag } from 'src/data/helpers/CounterBag';
import { DispatchRecordList } from 'src/data/helpers/DispatchRecordList';
import { VehicleBag } from 'src/data/helpers/VehicleBag';
import { CommuterRequest } from 'src/data/models/CommuterRequest';
import { RoutePoint } from 'src/data/models/RoutePoint';
import { VehicleHeartbeat } from 'src/data/models/VehicleHeartbeat';

const mm = 'DispatchService';

@Injectable()
export class DispatchService {
  constructor(
    private configService: ConfigService,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,

    @InjectModel(RouteLandmark.name)
    private routeLandmarkModel: mongoose.Model<RouteLandmark>,

    @InjectModel(DispatchRecord.name)
    private dispatchRecordModel: mongoose.Model<DispatchRecord>,

    @InjectModel(Vehicle.name)
    private vehicleModel: mongoose.Model<Vehicle>,

    @InjectModel(VehicleArrival.name)
    private vehicleArrivalModel: mongoose.Model<VehicleArrival>,

    @InjectModel(AmbassadorPassengerCount.name)
    private ambassadorPassengerCountModel: mongoose.Model<AmbassadorPassengerCount>,

    @InjectModel(VehicleDeparture.name)
    private vehicleDepartureModel: mongoose.Model<VehicleDeparture>,

    @InjectModel(Route.name)
    private routeModel: mongoose.Model<Route>,
  ) {}

  public async getAmbassadorPassengerCount(
    vehicle: Vehicle,
    minutesAgo: number,
    mark: RouteLandmark,
    user: User,
    passengers: number,
  ): Promise<AmbassadorPassengerCount> {
    return null;
  }
  public async countVehicleDeparturesByDate(
    vehicleId: string,
    startDate: string,
  ): Promise<number> {
    return null;
  }
  public async countVehicleHeartbeatsByDate(
    vehicleId: string,
    startDate: string,
  ): Promise<number> {
    return null;
  }
  public async countVehiclePassengerCounts(vehicleId: string): Promise<number> {
    return null;
  }
  public async getAssociationVehicleDepartures(
    associationId: string,
    startDate: string,
  ): Promise<VehicleDeparture[]> {
    return [];
  }
  public async getAssociationDispatchRecords(
    associationId: string,
  ): Promise<DispatchRecord[]> {
    return [];
  }
  public async getAssociationDispatchRecordsByDate(
    associationId: string,
    startDate: string,
  ): Promise<DispatchRecord[]> {
    return [];
  }
  public async getAssociationVehicleArrivals(
    associationId: string,
  ): Promise<VehicleArrival[]> {
    return [];
  }
  public async getAssociationVehicleArrivalsByDate(
    associationId: string,
    startDate: string,
  ): Promise<VehicleArrival[]> {
    return [];
  }
  public async getAssociationCommuterRequests(
    associationId: string,
    startDate: string,
  ): Promise<CommuterRequest[]> {
    return [];
  }
  public async generateAmbassadorPassengerCount(
    vehicle: Vehicle,
    routeLandmarks: RouteLandmark[],
    users: User[],
    minutesAgo: number,
    previousAPC: AmbassadorPassengerCount,
    mark: RouteLandmark,
  ): Promise<AmbassadorPassengerCount> {
    return null;
  }
  public async generateHeartbeatBetweenLandmarks(
    vehicle: Vehicle,
    mark: RouteLandmark,
    next: RouteLandmark,
    minutesAgo: number,
  ): Promise<void> {
    return null;
  }
  public async countMarshalDispatchRecords(userId: string): Promise<number> {
    return null;
  }
  public async findVehicleArrivalsByLocation(
    associationId: string,
    latitude: number,
    longitude: number,
    radiusInKM: number,
    minutes: number,
    limit: number,
  ): Promise<VehicleArrival[]> {
    return [];
  }
  public async findVehicleDeparturesByLocation(
    associationId: string,
    latitude: number,
    longitude: number,
    radiusInKM: number,
    minutes: number,
    limit: number,
  ): Promise<VehicleDeparture[]> {
    return [];
  }
  public async getLandmarkVehicleDepartures(
    landmarkId: string,
  ): Promise<VehicleDeparture[]> {
    return [];
  }
  public async getAssociationBagZippedFile(
    associationId: string,
    startDate: string,
  ): Promise<File> {
    return null;
  }
  public async generateRouteDispatchRecords(
    route: Route,
    vehicle: Vehicle,
    routeLandmarks: RouteLandmark[],
    users: User[],
    intervalInSeconds: number,
  ): Promise<void> {
    return null;
  }
  public async addDispatchRecord(
    dispatchRecord: DispatchRecord,
  ): Promise<DispatchRecord> {
    return null;
  }
  public async getVehicleArrivalsByDate(
    vehicleId: string,
    startDate: string,
  ): Promise<VehicleArrival[]> {
    return [];
  }
  public async getVehicleArrivals(
    vehicleId: string,
  ): Promise<VehicleArrival[]> {
    return [];
  }
  public async getVehicleHeartbeats(
    vehicleId: string,
    startDate: string,
  ): Promise<VehicleHeartbeat[]> {
    return [];
  }
  public async getVehicleDispatchRecords(
    vehicleId: string,
    startDate: string,
  ): Promise<DispatchRecord[]> {
    return [];
  }
  public async getVehiclePassengerCounts(
    vehicleId: string,
    startDate: string,
  ): Promise<AmbassadorPassengerCount[]> {
    return [];
  }
  public async getVehicleDepartures(
    vehicleId: string,
  ): Promise<VehicleDeparture[]> {
    return [];
  }
  public async getVehicleDeparturesByDate(
    vehicleId: string,
    startDate: string,
  ): Promise<VehicleDeparture[]> {
    return [];
  }
  public async countDispatchesByDate(
    vehicleId: string,
    startDate: string,
  ): Promise<number> {
    return null;
  }
  public async countVehicleArrivalsByDate(
    vehicleId: string,
    startDate: string,
  ): Promise<number> {
    return null;
  }
  public async countPassengerCountsByDate(
    vehicleId: string,
    startDate: string,
  ): Promise<number> {
    return null;
  }
  public async countVehicleDepartures(vehicleId: string): Promise<number> {
    return null;
  }
  public async countVehicleDispatches(vehicleId: string): Promise<number> {
    return null;
  }
  public async countVehicleArrivals(vehicleId: string): Promise<number> {
    return null;
  }
  public async getOwnerDispatchRecords(
    userId: string,
    startDate: string,
  ): Promise<DispatchRecord[]> {
    return [];
  }
  public async getOwnerVehicleArrivals(
    userId: string,
    startDate: string,
  ): Promise<VehicleArrival[]> {
    return [];
  }
  public async getOwnerVehicleDepartures(
    userId: string,
    startDate: string,
  ): Promise<VehicleDeparture[]> {
    return [];
  }
  public async getOwnerVehicleHeartbeats(
    userId: string,
    startDate: string,
  ): Promise<VehicleHeartbeat[]> {
    return [];
  }
  public async getOwnerPassengerCounts(
    userId: string,
    startDate: string,
  ): Promise<AmbassadorPassengerCount[]> {
    return [];
  }
  public async getAssociationBag(
    associationId: string,
    startDate: string,
  ): Promise<AssociationBag> {
    return null;
  }
  public async handleArrivalAndDispatch(
    users: User[],
    vehicle: Vehicle,
    minutesAgo: number,
    mark: RouteLandmark,
  ): Promise<void> {
    return null;
  }
  public async handleDateAndSleep(
    minutesAgo: number,
    intervalInSeconds: number,
  ): Promise<number> {
    return null;
  }
  public async generateDeparture(
    vehicle: Vehicle,
    mark: RouteLandmark,
    minutesAgo: number,
  ): Promise<void> {
    return null;
  }
  public async writeHeartbeatBetween(
    vehicle: Vehicle,
    minutesAgo: number,
    rp: RoutePoint,
  ): Promise<void> {
    return null;
  }
  public async addVehicleDeparture(
    vehicleDeparture: VehicleDeparture,
  ): Promise<VehicleDeparture> {
    return null;
  }
  public async handleArrival(
    vehicle: Vehicle,
    minutesAgo: number,
    mark: RouteLandmark,
  ): Promise<void> {
    return null;
  }
  public async writeHeartbeat(
    vehicle: Vehicle,
    minutesAgo: number,
    mark: RouteLandmark,
  ): Promise<void> {
    return null;
  }
  public async addVehicleArrival(
    vehicleArrival: VehicleArrival,
  ): Promise<VehicleArrival> {
    return null;
  }
  public async getRouteDispatchRecords(
    routeId: string,
    startDate: string,
  ): Promise<DispatchRecord[]> {
    return [];
  }
  public async getRouteVehicleArrivals(
    routeId: string,
    startDate: string,
  ): Promise<VehicleArrival[]> {
    return [];
  }
  public async addDispatchRecords(
    dispatchRecordList: DispatchRecordList,
  ): Promise<DispatchRecord[]> {
    return [];
  }
  public async getLandmarkDispatchRecords(
    landmarkId: string,
  ): Promise<DispatchRecord[]> {
    return [];
  }
  public async getVehicleBag(
    vehicleId: string,
    startDate: string,
  ): Promise<VehicleBag> {
    return null;
  }
  public async getMarshalDispatchRecords(
    userId: string,
    startDate: string,
  ): Promise<DispatchRecord[]> {
    return [];
  }
  public async getLandmarkVehicleArrivals(
    landmarkId: string,
  ): Promise<VehicleArrival[]> {
    return [];
  }
  public async getVehicleCountsByDate(
    vehicleId: string,
    startDate: string,
  ): Promise<CounterBag[]> {
    return [];
  }
  public async getVehicleCounts(vehicleId: string): Promise<CounterBag[]> {
    return [];
  }
  public async getOwnersBag(
    userId: string,
    startDate: string,
  ): Promise<BigBag> {
    return null;
  }
  public async getAssociationCounts(
    associationId: string,
    startDate: string,
  ): Promise<AssociationCounts> {
    return null;
  }
  public async fixOwnerToPassengerCounts(
    userId: string,
    ownerId: string,
    ownerName: string,
  ): Promise<string> {
    return null;
  }
}
