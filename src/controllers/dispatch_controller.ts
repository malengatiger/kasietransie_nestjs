import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DispatchRecord } from 'src/data/models/DispatchRecord';
import { DispatchService } from 'src/services/DispatchService';
import { MyFirebaseService } from 'src/services/FirebaseService';

@Controller('api/v1')
export class DispatchController {
  constructor(
    private readonly dispatchService: DispatchService,
    private readonly fbService: MyFirebaseService,
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
}
