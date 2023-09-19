/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { VehicleHeartbeat } from 'src/data/models/VehicleHeartbeat';
import { HeartbeatService } from 'src/services/HeartbeatService';

@Controller('api/v1')
export class HeartbeatController {
  constructor(private heartbeatService: HeartbeatService) {}

  @Post('addVehicleHeartbeat')
  public async addVehicleHeartbeat(
    @Body() heartbeat: VehicleHeartbeat,
  ): Promise<VehicleHeartbeat> {
    return await this.heartbeatService.addVehicleHeartbeat(heartbeat);
  }

  @Get('getVehicleHeartbeats')
  public async getVehicleHeartbeats(
    @Query() query: { vehicleId: string; cutoffHours: number },
  ): Promise<VehicleHeartbeat[]> {
    return await this.heartbeatService.getVehicleHeartbeats(
      query.vehicleId,
      query.cutoffHours,
    );
  }
  @Get('getOwnerVehicleHeartbeats')
  public async getOwnerVehicleHeartbeats(
    @Query() query: { userId: string; cutoffHours: number },
  ): Promise<VehicleHeartbeat[]> {
    return await this.heartbeatService.getOwnerVehicleHeartbeats(
      query.userId,
      query.cutoffHours,
    );
  }
  @Get('getAssociationVehicleHeartbeats')
  public async getAssociationVehicleHeartbeats(
    @Query() query: { associationId: string; startDate: string },
  ): Promise<VehicleHeartbeat[]> {
    return await this.heartbeatService.getAssociationVehicleHeartbeats(
      query.associationId,
      query.startDate,
    );
  }
}
