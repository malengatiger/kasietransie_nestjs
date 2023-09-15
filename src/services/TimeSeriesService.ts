/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { VehicleHeartbeatAggregationResult } from 'src/data/helpers/VehicleHeartbeatAggregationResult';

const mm = 'TimeSeriesService';

@Injectable()
export class TimeSeriesService {
  constructor(private configService: ConfigService) {}

  public async aggregateVehicleHeartbeatData(
    vehicleId: string,
    startDate: string,
  ): Promise<VehicleHeartbeatAggregationResult[]> {
    return [];
  }
  public async aggregateAssociationHeartbeatData(
    associationId: string,
    startDate: string,
  ): Promise<File> {
    return null;
  }
  public async buildTimeSeries(
    collectionName: string,
    timeField: string,
    metaField: string,
  ): Promise<any> {
    //CustomResponse
    return null;
  }
  public async addHeartbeatTimeSeries(
    associationId: string,
    vehicleId: string,
    vehicleReg: string,
  ): Promise<any> {
    //CustomResponse
    return null;
  }
}
