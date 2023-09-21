import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CounterBag } from 'src/data/helpers/CounterBag';
import { AmbassadorPassengerCount } from 'src/data/models/AmbassadorPassengerCount';
import { DispatchRecord } from 'src/data/models/DispatchRecord';
import { AmbassadorService } from 'src/services/AmbassadorService';
import { DispatchService } from 'src/services/DispatchService';
import { MyFirebaseService } from 'src/services/FirebaseService';

@Controller('api/v1')
export class AmbassadorController {
  constructor(
    private readonly dispatchService: DispatchService,
    private readonly fbService: MyFirebaseService,
    private readonly ambassadorService: AmbassadorService,
  ) {}

  @Post('addDispatch')
  async addDispatch(
    @Body() dispatchRecord: DispatchRecord,
  ): Promise<DispatchRecord> {
    return await this.dispatchService.addDispatchRecord(dispatchRecord);
  }
  @Get('getVehicleDispatchRecords')
  async getVehicleDispatchRecords(
    @Query() query: { vehicleId: string; startDate: string },
  ): Promise<DispatchRecord[]> {
    return await this.dispatchService.getVehicleDispatchRecords(
      query.vehicleId,
      query.startDate,
    );
  }
  @Get('getVehicleCounts')
  async getVehicleCounts(
    @Query() query: { vehicleId: string },
  ): Promise<CounterBag[]> {
    return await this.dispatchService.getVehicleCounts(query.vehicleId);
  }

  @Get('getUserAmbassadorPassengerCounts')
  async getUserAmbassadorPassengerCounts(
    @Query() query: { userId: string; startSate: string },
  ): Promise<AmbassadorPassengerCount[]> {
    return await this.ambassadorService.getUserAmbassadorPassengerCounts(
      query.userId,
      query.startSate,
    );
  }
}
