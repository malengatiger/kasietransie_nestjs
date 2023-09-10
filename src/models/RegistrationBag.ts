import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Association } from './Association';
import { Country } from './Country';
import { SettingsModel } from './SettingsModel';
import { User } from './User';
@Schema({
  timestamps: true,
  collection: 'RegistrationBag',
})
export class RegistrationBag {
  @Prop()
  association: Association;
  @Prop()
  user: User;
  @Prop()
  settings: SettingsModel;
  @Prop()
  country: Country;
}

export const RegistrationBagSchema =
  SchemaFactory.createForClass(RegistrationBag);
