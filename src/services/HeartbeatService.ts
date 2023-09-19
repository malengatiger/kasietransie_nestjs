/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import mongoose from 'mongoose';
import { GenerationRequest } from 'src/data/helpers/GenerationRequest';
import { RoutePoint } from 'src/data/models/RoutePoint';
import { Vehicle } from 'src/data/models/Vehicle';
import { VehicleHeartbeat } from 'src/data/models/VehicleHeartbeat';
import { MessagingService } from 'src/messaging/messaging.service';
import { MyUtils } from 'src/my-utils/my-utils';

const mm = '🌶🌶🌶 HeartbeatService 🌶 ';

@Injectable()
export class HeartbeatService {
  constructor(
    private configService: ConfigService,
    private messagingService: MessagingService,
    @InjectModel(Vehicle.name)
    private vehicleModel: mongoose.Model<Vehicle>,

    @InjectModel(VehicleHeartbeat.name)
    private vehicleHeartbeatModel: mongoose.Model<VehicleHeartbeat>,
  ) {}

  public async generateVehicleRouteHeartbeats(
    vehicleId: string,
    routeId: string,
    startDate: string,
    intervalInSeconds: number,
  ): Promise<void> {
    return null;
  }

  public async getAssociationVehicleHeartbeats(
    associationId: string,
    startDate: string,
  ): Promise<VehicleHeartbeat[]> {
    const list = await this.vehicleHeartbeatModel.find({
      associationId: associationId,
      created: { $gte: startDate },
    });
    Logger.log(`${mm} getAssociationVehicleHeartbeats: ${list.length}`);
    return list;
  }
  public async addVehicleHeartbeat(
    heartbeat: VehicleHeartbeat,
  ): Promise<VehicleHeartbeat> {
    return await this.vehicleHeartbeatModel.create(heartbeat);
  }
  public async generateRouteHeartbeats(
    request: GenerationRequest,
  ): Promise<void> {
    return null;
  }
  public async getVehicleHeartbeats(
    vehicleId: string,
    cutoffHours: number,
  ): Promise<VehicleHeartbeat[]> {
    const startDate = MyUtils.getStartDate(cutoffHours);
    const list = await this.vehicleHeartbeatModel.find({
      vehicleId: vehicleId,
      created: { $gte: startDate },
    });

    return list;
  }
  public async countVehicleHeartbeats(vehicleId: string): Promise<number> {
    return await this.vehicleHeartbeatModel
      .find({ vehicleId: vehicleId })
      .count();
  }
  public async getOwnerVehicleHeartbeats(
    userId: string,
    cutoffHours: number,
  ): Promise<VehicleHeartbeat[]> {
    const startDate = MyUtils.getStartDate(cutoffHours);
    const list = await this.vehicleHeartbeatModel.find({
      ownerId: userId,
      created: { $gte: startDate },
    });

    return list;
  }
  public async writeHeartbeat(
    vehicleId: string,
    startDate: string,
    intervalInSeconds: number,
    vehicle: Vehicle,
    pointsFiltered: RoutePoint[],
  ): Promise<VehicleHeartbeat> {
    const date: Date = new Date(startDate);
    pointsFiltered.forEach(async (point) => {
      date.setMinutes(Math.random() * 10);
      const choice = Math.random() * 100;
      if (choice > 10) {
        const hb = new VehicleHeartbeat();
        hb.vehicleId = vehicleId;
        hb.vehicleHeartbeatId = randomUUID.toString();
        hb.created = date.toISOString();
        hb.vehicleReg = vehicle.vehicleReg;
        hb.make = vehicle.make;
        hb.model = vehicle.model;
        hb.position = point.position;
        hb.ownerId = vehicle.ownerId;
        hb.ownerName = vehicle.ownerName;
        hb.associationId = vehicle.associationId;

        try {
          await this.vehicleHeartbeatModel.create(hb);
          this.messagingService.sendHeartbeatMessage(hb);
        } catch (error) {
          Logger.error(error);
        }
      }
    });
    return null;
  }
}
