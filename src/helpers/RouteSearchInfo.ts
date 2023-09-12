import { Route } from 'src/models/Route';

export class RouteSearchInfo {
  latitude: number;
  longitude: number;
  routes: Route[];
  routeLandmarks: [];
  distanceFromStartOfRoute: [];
  distanceFromEndOfRoute: [];
}
