/* eslint-disable @typescript-eslint/no-unused-vars */
////////////////////////////////////////////////////////////////////////
import {
  Controller,
  Get,
  Query,
  Res,
  Logger,
  Post,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import { Route } from 'src/data/models/Route';
import { RouteLandmark } from 'src/data/models/RouteLandmark';
import { RoutePoint } from 'src/data/models/RoutePoint';
import { RouteService } from 'src/services/RouteService';
const mm = ' 🚼 🚼 🚼 RouteController  🚼';

@Controller('api/v1')
export class RouteController {
  private readonly logger = new Logger(RouteController.name);

  constructor(private readonly routeService: RouteService) {}

  @Post('addRoute')
  async addRoute(@Body() route: Route): Promise<Route> {
    return await this.routeService.addRoute(route);
  }
  @Post('addRoutePoints')
  async addRoutePoints(@Body() routePoints: RoutePoint[]): Promise<number> {
    return await this.routeService.addRoutePoints(routePoints);
  }

  @Get('getAssociationRoutes')
  async getAssociationRoutes(
    @Query() query: { associationId: string },
  ): Promise<Route[]> {
    const list = await this.routeService.getAssociationRoutes(
      query.associationId,
    );
    this.logger.log(`${mm} routes found: ${list.length}`);
    return list;
  }
  @Get('getAssociationRouteLandmarks')
  async getAssociationRouteLandmarks(
    @Query() query: { associationId: string },
  ): Promise<RouteLandmark[]> {
    const list = await this.routeService.getAssociationRouteLandmarks(
      query.associationId,
    );
    this.logger.log(`${mm} routeLandmarks found: ${list.length}`);
    return list;
  }
  @Get('getRoutePointsZipped')
  public async getRoutePointsZipped(
    @Query('routeId') routeId: string,
    @Res() res: Response,
  ) {
    try {
      const fileName = await this.routeService.getRoutePointsZipped(routeId);
      this.sendFile(fileName, res);
    } catch (error) {
      this.logger.error('Error getting route zipped file:', error);
      res.status(500).send('Error downloading file: ' + error.message);
    }
  }

  private sendFile(fileName: string, res: Response) {
    this.logger.log('Sending file: ' + fileName);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=route.zip`);
    res.sendFile(fileName);
  }
}
