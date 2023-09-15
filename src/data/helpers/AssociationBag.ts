import { CommuterRequest } from 'src/data/models/CommuterRequest';
import { DispatchRecord } from 'src/data/models/DispatchRecord';
import { VehicleArrival } from 'src/data/models/VehicleArrival';
import { VehicleDeparture } from 'src/data/models/VehicleDeparture';
import { VehicleHeartbeat } from 'src/data/models/VehicleHeartbeat';

export class AssociationBag {
  passengerCounts: [];
  heartbeats: VehicleHeartbeat[];
  arrivals: VehicleArrival[];
  departures: VehicleDeparture[];
  dispatchRecords: DispatchRecord[];
  commuterRequests: CommuterRequest[];
}
