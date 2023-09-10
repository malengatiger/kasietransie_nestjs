import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './Position';
@Schema({
  timestamps: true,
  collection: 'UserGeofenceEvent',
})
export class UserGeofenceEvent {
  @Prop()
  _partitionKey: string;
  @Prop()
  _id: string;
  @Prop()
  userGeofenceId: string;
  @Prop()
  landmarkId: string;
  @Prop()
  activityType: string;
  @Prop()
  action: string;
  @Prop()
  userId: string;
  @Prop()
  longDate: number;
  @Prop()
  created: string;
  @Prop()
  landmarkName: string;
  @Prop()
  confidence: number;
  @Prop()
  odometer: number;
  @Prop()
  moving: boolean;
  @Prop()
  associationId: string;
  @Prop()
  position: Position;
}

export const UserGeofenceEventSchema =
  SchemaFactory.createForClass(UserGeofenceEvent);
