import { Vehicle } from 'src/models/Vehicle';

export class VehicleList {
  routeId: string;
  created: string;
  intervalInSeconds: number;
  vehicles: Vehicle[];
}
