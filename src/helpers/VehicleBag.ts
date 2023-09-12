import { AmbassadorPassengerCount } from 'src/models/AmbassadorPassengerCount';
import { DispatchRecord } from 'src/models/DispatchRecord';
import { VehicleArrival } from 'src/models/VehicleArrival';
import { VehicleDeparture } from 'src/models/VehicleDeparture';
import { VehicleHeartbeat } from 'src/models/VehicleHeartbeat';

export class VehicleBag {
  vehicleId: string;
  created: string;
  dispatchRecords: DispatchRecord[];
  heartbeats: VehicleHeartbeat[];
  passengerCounts: AmbassadorPassengerCount[];
  arrivals: VehicleArrival[];
  departures: VehicleDeparture[];
}
