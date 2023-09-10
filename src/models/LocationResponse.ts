import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './Position';
@Schema({
  timestamps: true,
  collection: 'LocationResponse',
})
export class LocationResponse {
  @Prop()
  _partitionKey: string;
  @Prop()
  _id: string;
  @Prop()
  associationId: string;
  @Prop()
  vehicleId: string;
  @Prop()
  vehicleReg: string;
  @Prop()
  created: string;
  @Prop()
  userId: string;
  @Prop()
  userName: string;
  @Prop()
  position: Position;
}

export const LocationResponseSchema =
  SchemaFactory.createForClass(LocationResponse);
