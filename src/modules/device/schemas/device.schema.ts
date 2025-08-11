import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now } from 'mongoose';

import { DeviceType } from './device-type.enum';

@Schema()
export class Device {
  @Prop({ required: true })
  name: string;

  @Prop()
  location: string;

  @Prop({ type: String, enum: Object.values(DeviceType), required: true })
  type: DeviceType;

  @Prop({ default: now })
  createdAt: Date;
}
export const DeviceSchema = SchemaFactory.createForClass(Device);
