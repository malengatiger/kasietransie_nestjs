/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { RouteUpdateRequest } from 'src/models/RouteUpdateRequest';
import { LocationRequest } from 'src/models/LocationRequest';
import { CommuterRequest } from 'src/models/CommuterRequest';
import { DispatchRecord } from 'src/models/DispatchRecord';
import { VehicleHeartbeat } from 'src/models/VehicleHeartbeat';
import { UserGeofenceEvent } from 'src/models/UserGeofenceEvent';
import { LocationResponse } from 'src/models/LocationResponse';
import { VehicleArrival } from 'src/models/VehicleArrival';
import { AmbassadorPassengerCount } from 'src/models/AmbassadorPassengerCount';
import { VehicleMediaRequest } from 'src/models/VehicleMediaRequest';
import { VehicleDeparture } from 'src/models/VehicleDeparture';
import { AssociationToken } from 'src/models/AssociationToken';

const mm = 'MessagingService';

@Injectable()
export class MessagingService {
  constructor(
    private configService: ConfigService,
    @InjectModel(RouteUpdateRequest.name)
    private routeUpdateRequestModel: mongoose.Model<RouteUpdateRequest>,

    @InjectModel(LocationRequest.name)
    private locationRequestModel: mongoose.Model<LocationRequest>,

    @InjectModel(CommuterRequest.name)
    private commuterRequestModel: mongoose.Model<CommuterRequest>,

    @InjectModel(DispatchRecord.name)
    private dispatchRecordModel: mongoose.Model<DispatchRecord>,

    @InjectModel(VehicleHeartbeat.name)
    private vehicleHeartbeatModel: mongoose.Model<VehicleHeartbeat>,

    @InjectModel(UserGeofenceEvent.name)
    private userGeofenceEventModel: mongoose.Model<UserGeofenceEvent>,

    @InjectModel(LocationResponse.name)
    private locationResponseModel: mongoose.Model<LocationResponse>,

    @InjectModel(Notification.name)
    private notificationModel: mongoose.Model<Notification>,

    @InjectModel(VehicleArrival.name)
    private vehicleArrivalModel: mongoose.Model<VehicleArrival>,

    @InjectModel(AmbassadorPassengerCount.name)
    private ambassadorPassengerCountModel: mongoose.Model<AmbassadorPassengerCount>,

    @InjectModel(VehicleMediaRequest.name)
    private vehicleMediaRequestModel: mongoose.Model<VehicleMediaRequest>,

    @InjectModel(VehicleDeparture.name)
    private vehicleDepartureModel: mongoose.Model<VehicleDeparture>,
  ) {}

  public async sendVehicleMediaRequestMessage(
    request: VehicleMediaRequest,
  ): Promise<number> {
    return null;
  }
  public async getTokens(associationId: string): Promise<AssociationToken[]> {
    return [];
  }
  public async sendLocationRequestMessage(
    locationRequest: LocationRequest,
  ): Promise<void> {
    return null;
  }
  public async sendVehicleDepartureMessage(
    vehicleDeparture: VehicleDeparture,
  ): Promise<void> {
    return null;
  }
  public async sendVehicleHeartbeatMessage(
    heartbeat: VehicleHeartbeat,
  ): Promise<void> {
    return null;
  }
  public async sendLocationResponseMessage(
    locationResponse: LocationResponse,
  ): Promise<void> {
    return null;
  }
  public async sendUserGeofenceEventMessage(
    userGeofenceEvent: UserGeofenceEvent,
  ): Promise<void> {
    return null;
  }
  public async sendAmbassadorPassengerCountMessage(
    passengerCount: AmbassadorPassengerCount,
  ): Promise<void> {
    return null;
  }
  public async sendVehicleArrivalMessage(
    vehicleArrival: VehicleArrival,
  ): Promise<void> {
    return null;
  }
  public async sendCommuterRequestMessage(
    commuterRequest: CommuterRequest,
  ): Promise<void> {
    return null;
  }
  public async sendDispatchRecordMessage(
    dispatchRecord: DispatchRecord,
  ): Promise<void> {
    return null;
  }
  public async sendVehicleUpdateMessage(
    associationId: string,
    vehicleId: string,
  ): Promise<number> {
    return null;
  }
  public async addAssociationToken(
    associationId: string,
    userId: string,
    token: string,
  ): Promise<AssociationToken> {
    return null;
  }
  public async addSubscriptions(
    registrationTokens: string[],
    topics: string[],
  ): Promise<any> {
    return null;
  }
  public async checkSleeping(): Promise<boolean> {
    return null;
  }
  public async buildMessageWithNotification(
    dataName: string,
    topic: string,
    payload: string,
    notification: Notification,
  ): Promise<any> {
    return null;
  }
  public async buildMessage(
    dataName: string,
    topic: string,
    payload: string,
  ): Promise<any> {
    return null;
  }
  public async sleepToCatchUp(e: Error): Promise<void> {
    return null;
  }
  public async sendRouteUpdateMessage(
    routeUpdateRequest: RouteUpdateRequest,
  ): Promise<void> {
    return null;
  }
}
