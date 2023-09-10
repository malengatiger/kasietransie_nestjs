import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
  collection: 'State',
})
export class State {
  @Prop()
  _partitionKey: string;
  @Prop()
  _id: string;
  @Prop()
  stateId: string;
  @Prop()
  countryId: string;
  @Prop()
  name: string;
  @Prop()
  countryName: string;
  @Prop()
  stateCode: string;
  @Prop()
  latitude: number;
  @Prop()
  longitude: number;
}

export const StateSchema = SchemaFactory.createForClass(State);
