import { AmbassadorPassengerCount } from 'src/models/AmbassadorPassengerCount';
import { DispatchRecord } from 'src/models/DispatchRecord';
import { VehicleArrival } from 'src/models/VehicleArrival';
import { VehicleDeparture } from 'src/models/VehicleDeparture';
import { VehicleHeartbeat } from 'src/models/VehicleHeartbeat';

export class BigBag {
  vehicleArrivals: VehicleArrival[];
  dispatchRecords: DispatchRecord[];
  vehicleHeartbeats: VehicleHeartbeat[];
  vehicleDepartures: VehicleDeparture[];
  passengerCounts: AmbassadorPassengerCount[];
}
