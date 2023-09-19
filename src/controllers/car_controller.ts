/* eslint-disable @typescript-eslint/no-unused-vars */
////////////////////////////////////////////////////////////////////////
import {
  Controller,
  Query,
  Logger,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { Vehicle } from 'src/data/models/Vehicle';
import { VehicleService } from 'src/services/VehicleService';
import { FileInterceptor } from '@nestjs/platform-express';
import { RouteAssignment } from 'src/data/models/RouteAssignment';
import { RouteAssignmentList } from 'src/data/helpers/RouteAssignmentList';

const mm = ' 🚼 🚼 🚼 RouteController  🚼';

@Controller('api/v1')
export class CarController {
  private readonly logger = new Logger(CarController.name);

  constructor(private readonly carService: VehicleService) {}

  @Post('addVehicle')
  async addVehicle(@Body() vehicle: Vehicle): Promise<Vehicle> {
    return await this.carService.addVehicle(vehicle);
  }
  @Post('importVehiclesFromJSON')
  @UseInterceptors(FileInterceptor('file'))
  async uploadUsersFromCsv(
    @UploadedFile() file: Express.Multer.File,
    @Query('associationId') associationId: string,
  ): Promise<Vehicle[]> {
    const res = await this.carService.importVehiclesFromCSV(
      file,
      associationId,
    );

    return res;
  }

  @Post('importVehiclesFromCSV')
  @UseInterceptors(FileInterceptor('file'))
  async uploadUsersFromJson(
    @UploadedFile() file: Express.Multer.File,
    @Query('associationId') associationId: string,
  ): Promise<Vehicle[]> {
    const res = await this.carService.importVehiclesFromJSON(
      file,
      associationId,
    );

    return res;
  }
  @Post('addRouteAssignments')
  async addRouteAssignments(
    @Body('assignments') assignments: RouteAssignmentList,
  ): Promise<RouteAssignment[]> {
    return await this.addRouteAssignments(assignments);
  }

  @Get('getOwnerVehicles')
  async getOwnerVehicles(@Query('userId') userId: string): Promise<Vehicle[]> {
    return await this.carService.getOwnerVehicles(userId, 0);
  }

  private sendFile(fileName: string, res: Response) {
    this.logger.log('Sending file: ' + fileName);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=route.zip`);
    res.sendFile(fileName);
  }
}
