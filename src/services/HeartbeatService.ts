/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { GenerationRequest } from 'src/data/helpers/GenerationRequest';
import { RoutePoint } from 'src/data/models/RoutePoint';
import { Vehicle } from 'src/data/models/Vehicle';
import { VehicleHeartbeat } from 'src/data/models/VehicleHeartbeat';

const mm = 'HeartbeatService';

@Injectable()
export class HeartbeatService {
  constructor(
    private configService: ConfigService,
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
  public async lambda$generateRouteHeartbeats$0(
    arg0: string,
    arg1: GenerationRequest,
  ): Promise<void> {
    return null;
  }
  public async getAssociationVehicleHeartbeats(
    associationId: string,
    startDate: string,
  ): Promise<VehicleHeartbeat[]> {
    return [];
  }
  public async addVehicleHeartbeat(
    heartbeat: VehicleHeartbeat,
  ): Promise<VehicleHeartbeat> {
    return null;
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
    return [];
  }
  public async countVehicleHeartbeats(vehicleId: string): Promise<number> {
    return null;
  }
  public async getOwnerVehicleHeartbeats(
    userId: string,
    cutoffHours: number,
  ): Promise<VehicleHeartbeat[]> {
    return [];
  }
  public async writeHeartbeat(
    vehicleId: string,
    startDate: string,
    intervalInSeconds: number,
    vehicle: Vehicle,
    pointsFiltered: RoutePoint[],
  ): Promise<void> {
    return null;
  }
}
