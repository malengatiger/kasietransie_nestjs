import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './Position';
@Schema({
  timestamps: true,
  collection: 'VehicleHeartbeat',
})
export class VehicleHeartbeat {
  @Prop()
  _partitionKey: string;
  @Prop()
  _id: string;
  @Prop()
  vehicleHeartbeatId: string;
  @Prop()
  vehicleId: string;
  @Prop()
  vehicleReg: string;
  @Prop()
  associationId: string;
  @Prop()
  ownerId: string;
  @Prop()
  ownerName: string;
  @Prop()
  position: Position;
  @Prop()
  created: string;
  @Prop()
  longDate: number;
  @Prop()
  make: string;
  @Prop()
  model: string;
  @Prop()
  appToBackground: boolean;
}

export const VehicleHeartbeatSchema =
  SchemaFactory.createForClass(VehicleHeartbeat);
