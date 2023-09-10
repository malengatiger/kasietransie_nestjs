import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
  collection: 'CalculatedDistance',
})
export class CalculatedDistance {
  @Prop()
  _partitionKey: string;
  @Prop()
  _id: string;
  @Prop()
  routeName: string;
  @Prop()
  routeId: string;
  @Prop()
  fromLandmark: string;
  @Prop()
  toLandmark: string;
  @Prop()
  fromLandmarkId: string;
  @Prop()
  toLandmarkId: string;
  @Prop()
  index: number;
  @Prop()
  distanceInMetres: number;
  @Prop()
  distanceFromStart: number;
  @Prop()
  fromRoutePointIndex: number;
  @Prop()
  toRoutePointIndex: number;
}

export const CalculatedDistanceSchema =
  SchemaFactory.createForClass(CalculatedDistance);
