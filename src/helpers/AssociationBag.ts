import { CommuterRequest } from 'src/models/CommuterRequest';
import { DispatchRecord } from 'src/models/DispatchRecord';
import { VehicleArrival } from 'src/models/VehicleArrival';
import { VehicleDeparture } from 'src/models/VehicleDeparture';
import { VehicleHeartbeat } from 'src/models/VehicleHeartbeat';

export class AssociationBag {
  passengerCounts: [];
  heartbeats: VehicleHeartbeat[];
  arrivals: VehicleArrival[];
  departures: VehicleDeparture[];
  dispatchRecords: DispatchRecord[];
  commuterRequests: CommuterRequest[];
}
