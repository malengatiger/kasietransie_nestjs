import { Route } from 'src/models/Route';
import { RouteCity } from 'src/models/RouteCity';
import { RouteLandmark } from 'src/models/RouteLandmark';
import { RoutePoint } from 'src/models/RoutePoint';

export class RouteBag {
  route: Route;
  routeLandmarks: RouteLandmark[];
  routePoints: RoutePoint[];
  routeCities: RouteCity[];
}
