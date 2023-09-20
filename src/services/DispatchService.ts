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
import { MessagingService } from 'src/messaging/messaging.service';

const mm = 'DispatchService';

@Injectable()
export class DispatchService {
  constructor(
    private configService: ConfigService,
    private messagingService: MessagingService,
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

    @InjectModel(VehicleHeartbeat.name)
    private vehicleHeartbeatModel: mongoose.Model<VehicleHeartbeat>,

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
    const res = await this.dispatchRecordModel.create(dispatchRecord);
    this.messagingService.sendDispatchMessage(dispatchRecord);
    Logger.log(`${mm} ... add DispatchRecord completed: 🛎🛎`);
    Logger.log(`${mm} ${res}`);
    return res;
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
    Logger.log(
      `${mm} getVehicleDispatchRecords: vehicleId: ${vehicleId} startDate: ${startDate}`,
    );
    const res = await this.dispatchRecordModel
      .find({
        vehicleId: vehicleId,
        created: { $gte: startDate },
      })
      .sort({ created: -1 });
    Logger.log(
      `${mm} ... getVehicleDispatchRecords found: 🛎 ${res.length} 🛎`,
    );
    return res;
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
    return await this.vehicleArrivalModel.create(vehicleArrival);
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
    return await this.dispatchRecordModel.create(
      dispatchRecordList.dispatchRecords,
    );
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
    const departures = await this.vehicleDepartureModel.find({
      vehicleId: vehicleId,
    });
    const dispatches = await this.dispatchRecordModel.find({
      vehicleId: vehicleId,
    });
    const arrivals = await this.vehicleArrivalModel.find({
      vehicleId: vehicleId,
    });
    const heartbeats = await this.vehicleHeartbeatModel.find({
      vehicleId: vehicleId,
    });
    const passCounts = await this.ambassadorPassengerCountModel.find({
      vehicleId: vehicleId,
    });
    const bags = [];
    const bag1 = new CounterBag();
    bag1.count = departures.length;
    bag1.description = 'VehicleDeparture';
    bags.push(bag1);
    const bag2 = new CounterBag();
    bag2.count = dispatches.length;
    bag2.description = 'DispatchRecord';
    bags.push(bag2);
    const bag3 = new CounterBag();
    bag3.count = arrivals.length;
    bag3.description = 'VehicleArrival';
    bags.push(bag3);
    const bag4 = new CounterBag();
    bag4.count = heartbeats.length;
    bag4.description = 'VehicleHeartbeat';
    bags.push(bag4);
    const bag5 = new CounterBag();
    bag5.count = passCounts.length;
    bag5.description = 'AmbassadorPassengerCount';
    bags.push(bag5);

    return bags;
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
