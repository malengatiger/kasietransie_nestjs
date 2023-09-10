/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Vehicle } from 'src/models/Vehicle';
import { Route } from 'src/models/Route';
import { CommuterRequest } from 'src/models/CommuterRequest';
import { GenerationRequest } from 'src/helper_models/GenerationRequest';

const mm = 'DispatchAsyncHelperService';

@Injectable()
export class DispatchAsyncHelperService {
  constructor(
    private configService: ConfigService,
    @InjectModel(Vehicle.name)
    private vehicleModel: mongoose.Model<Vehicle>,

    @InjectModel(Route.name)
    private routeModel: mongoose.Model<Route>,
  ) {}

  public async lambda$generateRouteDispatchRecordsInParallel$0(
    arg0: Route,
    arg1: Vehicle,
    arg2: [],
    arg3: [],
    arg4: GenerationRequest,
  ): Promise<void> {
    return null;
  }
  public async generateRouteDispatchRecordsInParallel(
    request: GenerationRequest,
  ): Promise<void> {
    return null;
  }
  public async generateCommuterRequestsInParallel(
    associationId: string,
  ): Promise<CommuterRequest[]> {
    return [];
  }
}
