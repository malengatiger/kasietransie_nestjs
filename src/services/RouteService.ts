/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { RouteUpdateRequest } from 'src/data/models/RouteUpdateRequest';
import { VehicleMediaRequest } from 'src/data/models/VehicleMediaRequest';
import { RouteLandmark } from 'src/data/models/RouteLandmark';
import { RouteCity } from 'src/data/models/RouteCity';
import { Route } from 'src/data/models/Route';
import { CalculatedDistanceList } from 'src/data/helpers/CalculatedDistanceList';
import { RouteBag } from 'src/data/helpers/RouteBag';
import { CalculatedDistance } from 'src/data/models/CalculatedDistance';
import { RoutePoint } from 'src/data/models/RoutePoint';
import { MyUtils } from 'src/my-utils/my-utils';
import { FileArchiverService } from 'src/my-utils/zipper';

const mm = 'RouteService';

@Injectable()
export class RouteService {
  constructor(
    // private configService: ConfigService,
    private archiveService: FileArchiverService,

    @InjectModel(RouteUpdateRequest.name)
    private routeUpdateRequestModel: mongoose.Model<RouteUpdateRequest>,

    @InjectModel(VehicleMediaRequest.name)
    private vehicleMediaRequestModel: mongoose.Model<VehicleMediaRequest>,

    @InjectModel(RouteLandmark.name)
    private routeLandmarkModel: mongoose.Model<RouteLandmark>,

    @InjectModel(RouteCity.name)
    private routeCityModel: mongoose.Model<RouteCity>,

    @InjectModel(RoutePoint.name)
    private routePointModel: mongoose.Model<RoutePoint>,

    @InjectModel(CalculatedDistance.name)
    private calculatedDistanceModel: mongoose.Model<CalculatedDistance>,

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
    const routeLandmarks = await this.routeLandmarkModel.find({
      associationId: associationId,
    });
    return routeLandmarks;
  }
  // public async getAssociationRouteZippedFile(
  //   associationId: string,
  // ): Promise<File> {
  //   return null;
  // }
  public async addRoute(route: Route): Promise<Route> {
    const url = await MyUtils.createQRCodeAndUploadToCloudStorage(
      JSON.stringify(route),
      'route',
      3,
    );
    route.qrCodeUrl = url;
    return await this.routeModel.create(route);
  }
  public async createRouteQRCode(route: Route): Promise<Route> {
    const url = await MyUtils.createQRCodeAndUploadToCloudStorage(
      JSON.stringify(route),
      'route',
      3,
    );
    route.qrCodeUrl = url;
    await this.routeModel.updateOne(route);
    return route;
  }
  public async getCalculatedDistances(
    routeId: string,
  ): Promise<CalculatedDistance[]> {
    return await this.calculatedDistanceModel.find({ routeId: routeId });
  }
  public async getRouteUpdateRequests(
    routeId: string,
  ): Promise<RouteUpdateRequest[]> {
    return [];
  }
  public async refreshRoute(routeId: string): Promise<RouteBag> {
    return null;
  }
  public async updateRouteColor(
    routeId: string,
    color: string,
  ): Promise<Route> {
    const r = await this.routeModel.findOne({ routeId: routeId });
    r.color = color;
    await this.routeModel.create(r);
    return r;
  }
  public async addRoutePoints(routePoints: RoutePoint[]): Promise<number> {
    const m = await this.routePointModel.create(routePoints);
    return m.length;
  }
  public async deleteRoutePointsFromIndex(
    routeId: string,
    index: number,
  ): Promise<RoutePoint[]> {
    const list = await this.routePointModel.deleteMany({
      routeId: routeId,
      index: { $gte: index },
    });
    Logger.log(`deleteRoutePoints deleted: ${list.deletedCount}`);
    return await this.routePointModel
      .find({ routeId: routeId })
      .sort({ index: 1 });
  }
  public async addCalculatedDistances(
    list: CalculatedDistanceList,
  ): Promise<CalculatedDistance[]> {
    return await this.calculatedDistanceModel.create(list.calculatedDistances);
  }
  public async addRouteLandmark(
    routeLandmark: RouteLandmark,
  ): Promise<RouteLandmark> {
    return await this.routeLandmarkModel.create(routeLandmark);
  }
  public async addVehicleMediaRequest(
    vehicleMediaRequest: VehicleMediaRequest,
  ): Promise<VehicleMediaRequest> {
    return await this.vehicleMediaRequestModel.create(vehicleMediaRequest);
  }
  public async addRouteUpdateRequest(
    routeUpdateRequest: RouteUpdateRequest,
  ): Promise<RouteUpdateRequest> {
    return await this.routeUpdateRequestModel.create(routeUpdateRequest);
  }
  public async updateRouteLandmark(
    routeLandmark: RouteLandmark,
  ): Promise<RouteLandmark> {
    return await this.routeLandmarkModel.create(routeLandmark);
  }
  public async addRouteCity(routeCity: RouteCity): Promise<RouteCity> {
    return await this.routeCityModel.create(routeCity);
  }
  public async getRouteCities(routeId: string): Promise<RouteCity[]> {
    return await this.routeCityModel.find({ routeId: routeId });
  }
  public async getRouteLandmarks(routeId: string): Promise<RouteLandmark[]> {
    return await this.routeLandmarkModel.find({ routeId: routeId });
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
  ): Promise<string> {
    const routePoints = await this.routePointModel.find({
      associationId: associationId,
    });
    const fileName = this.archiveService.zip([
      {
        content: JSON.stringify(routePoints),
      },
    ]);
    return fileName;
  }
  public async getAssociationRouteZippedFile(
    associationId: string,
  ): Promise<string> {
    const routes = await this.routeModel.find({
      associationId: associationId,
    });
    Logger.log(
      `${mm} getAssociationRouteZippedFile: 🍎🍎 🍎🍎 🍎🍎 routes: ${routes.length} `,
    );

    const points: any[] = [];
    const landmarks: any[] = [];
    const cities: any[] = [];

    await Promise.all(
      routes.map(async (route) => {
        // Logger.log(
        //   `${mm} getAssociationRouteZippedFile: 🍎🍎 🍎🍎 🍎🍎 route: ${route.name} `,
        // );
        const list = await this.routePointModel.find({
          routeId: route.routeId,
        });
        points.push(list);
        Logger.log(
          `${mm}  \t🍎🍎 route: ${route.name} routePoints: ${list.length} `,
        );

        const list1 = await this.routeLandmarkModel.find({
          routeId: route.routeId,
        });
        Logger.log(
          `${mm}  \t🍎🍎 route: ${route.name} routeLandmarks: ${list1.length} `,
        );
        landmarks.push(list1);

        const list2 = await this.routeCityModel.find({
          routeId: route.routeId,
        });
        cities.push(list2);
        Logger.log(
          `${mm}  \t🍎🍎 route: ${route.name} routeCities: ${list2.length} \n\n`,
        );
      }),
    );
    //
    Logger.log(`${mm} data.route:   🔷🔷 ${routes.length} routes`);
    Logger.log(`${mm} data.marks:   🔷🔷 ${landmarks.length} marks`);
    Logger.log(`${mm} data.cities:  🔷🔷 ${cities.length} cities`);
    Logger.log(`${mm} data.points:  🔷🔷 ${points.length} points`);

    const data = {
      routes: routes,
      points: points,
      landmarks: landmarks,
      cities: cities,
    };
    const mString = JSON.stringify(data);
    Logger.log(`${mm} string to archive: ${mString.length} bytes`);
    const fileName = this.archiveService.zip([
      {
        content: mString,
      },
    ]);
    return fileName;
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
    return await this.routeModel.find({ associationId: associationId });
  }
  public async getRoutePoints(routeId: string): Promise<RoutePoint[]> {
    const points = await this.routePointModel
      .find({ routeId: routeId })
      .sort({ index: 1 });
    return points;
  }

  public async getRoutePointsZipped(routeId: string): Promise<string> {
    const points = await this.routePointModel.find({ routeId: routeId });
    const json = JSON.stringify(points);
    const filePath = this.archiveService.zip([{ content: json }]);
    return filePath;
  }
}
