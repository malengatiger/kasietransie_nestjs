/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { LocationRequest } from 'src/data/models/LocationRequest';
import { LocationResponse } from 'src/data/models/LocationResponse';

const mm = 'LocationRequestService';

@Injectable()
export class LocationRequestService {
  constructor(
    private configService: ConfigService,
    @InjectModel(LocationRequest.name)
    private locationRequestModel: mongoose.Model<LocationRequest>,

    @InjectModel(LocationResponse.name)
    private locationResponseModel: mongoose.Model<LocationResponse>,
  ) {}

  public async addLocationRequest(
    locationRequest: LocationRequest,
  ): Promise<LocationRequest> {
    return null;
  }
  public async addLocationResponse(
    locationResponse: LocationResponse,
  ): Promise<LocationResponse> {
    return null;
  }
}
