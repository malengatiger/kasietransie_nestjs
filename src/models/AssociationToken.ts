import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
  collection: 'AssociationToken',
})
export class AssociationToken {
  @Prop()
  _partitionKey: string;
  @Prop()
  _id: string;
  @Prop()
  userId: string;
  @Prop()
  token: string;
  @Prop()
  created: string;
  @Prop()
  associationId: string;
  @Prop()
  associationName: string;
}

export const AssociationTokenSchema =
  SchemaFactory.createForClass(AssociationToken);
