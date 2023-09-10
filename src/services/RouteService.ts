/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { RouteUpdateRequest } from 'src/models/RouteUpdateRequest';
import { VehicleMediaRequest } from 'src/models/VehicleMediaRequest';
import { RouteLandmark } from 'src/models/RouteLandmark';
import { RouteCity } from 'src/models/RouteCity';
import { Route } from 'src/models/Route';
import { CalculatedDistanceList } from 'src/helper_models/CalculatedDistanceList';
import { RouteBag } from 'src/helper_models/RouteBag';
import { CalculatedDistance } from 'src/models/CalculatedDistance';
import { RoutePoint } from 'src/models/RoutePoint';

const mm = 'RouteService';

@Injectable()
export class RouteService {
  constructor(
    private configService: ConfigService,

    @InjectModel(RouteUpdateRequest.name)
    private routeUpdateRequestModel: mongoose.Model<RouteUpdateRequest>,

    @InjectModel(VehicleMediaRequest.name)
    private vehicleMediaRequestModel: mongoose.Model<VehicleMediaRequest>,

    @InjectModel(RouteLandmark.name)
    private routeLandmarkModel: mongoose.Model<RouteLandmark>,

    @InjectModel(RouteCity.name)
    private routeCityModel: mongoose.Model<RouteCity>,

    @InjectModel(Route.name)
    private routeModel: mongoose.Model<Route>,
  ) {}

  public async findAssociationRouteLandmarksByLocation(
    associationId: string,
    latitude: number,
    longitude: number,
    radiusInKM: number,
  ): Promise<RouteLandmark[]> {
    return [];
  }
  public async findRouteLandmarksByLocation(
    latitude: number,
    longitude: number,
    radiusInKM: number,
  ): Promise<RouteLandmark[]> {
    return [];
  }
  public async findAssociationRoutesByLocation(
    associationId: string,
    latitude: number,
    longitude: number,
    radiusInKM: number,
  ): Promise<Route[]> {
    return [];
  }
  public async getAssociationRouteLandmarks(
    associationId: string,
  ): Promise<RouteLandmark[]> {
    return [];
  }
  public async getAssociationRouteZippedFile(
    associationId: string,
  ): Promise<File> {
    return null;
  }
  public async addRoute(route: Route): Promise<Route> {
    return null;
  }
  public async createRouteQRCode(route: Route): Promise<void> {
    return null;
  }
  public async getCalculatedDistances(
    routeId: string,
  ): Promise<CalculatedDistance[]> {
    return [];
  }
  public async getRouteUpdateRequests(
    routeId: string,
  ): Promise<RouteUpdateRequest[]> {
    return [];
  }
  public async refreshRoute(routeId: string): Promise<RouteBag> {
    return null;
  }
  public async deleteRoutePoint(routePointId: string): Promise<number> {
    return null;
  }
  public async updateRouteColor(
    routeId: string,
    color: string,
  ): Promise<Route> {
    return null;
  }
  public async addRoutePoints(routePoints: RoutePoint[]): Promise<number> {
    return null;
  }
  public async deleteRoutePointsFromIndex(
    routeId: string,
    index: number,
  ): Promise<RoutePoint[]> {
    return [];
  }
  public async addCalculatedDistances(
    list: CalculatedDistanceList,
  ): Promise<CalculatedDistance[]> {
    return [];
  }
  public async addRouteLandmark(
    routeLandmark: RouteLandmark,
  ): Promise<RouteLandmark> {
    return null;
  }
  public async addVehicleMediaRequest(
    vehicleMediaRequest: VehicleMediaRequest,
  ): Promise<VehicleMediaRequest> {
    return null;
  }
  public async addRouteUpdateRequest(
    routeUpdateRequest: RouteUpdateRequest,
  ): Promise<RouteUpdateRequest> {
    return null;
  }
  public async updateRouteLandmark(
    routeLandmark: RouteLandmark,
  ): Promise<RouteLandmark> {
    return null;
  }
  public async addRouteCity(routeCity: RouteCity): Promise<RouteCity> {
    return null;
  }
  public async getRouteCities(routeId: string): Promise<RouteCity[]> {
    return [];
  }
  public async getRouteLandmarks(routeId: string): Promise<RouteLandmark[]> {
    return [];
  }
  public async findRoutesByLocation(
    latitude: number,
    longitude: number,
    radiusInKM: number,
  ): Promise<Route[]> {
    return [];
  }
  public async findRoutePointsByLocation(
    latitude: number,
    longitude: number,
    radiusInKM: number,
  ): Promise<RoutePoint[]> {
    return [];
  }
  public async getAssociationRoutePoints(
    associationId: string,
  ): Promise<RoutePoint[]> {
    return [];
  }
  public async getAssociationRouteCities(
    associationId: string,
  ): Promise<RouteCity[]> {
    return [];
  }
  public async putRouteLandmarksInOrder(
    routeId: string,
  ): Promise<RouteLandmark[]> {
    return [];
  }
  public async getAssociationRoutes(associationId: string): Promise<Route[]> {
    return [];
  }
  public async getRoutePoints(
    routeId: string,
    page: number,
  ): Promise<RoutePoint[]> {
    return [];
  }
}
