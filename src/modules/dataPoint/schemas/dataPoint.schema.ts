import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now } from 'mongoose';

import { Device } from 'src/modules/device/schemas/device.schema';
import { DataPointEnum } from './dataPoint-type.enum';

@Schema()
export class DataPoint {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true })
  device: Device;

  @Prop({ type: String, enum: Object.values(DataPointEnum), required: true })
  type: DataPointEnum;

  @Prop({ required: true })
  value: number;

  @Prop({ default: now })
  createdAt: Date;
}
export const DataPointSchema = SchemaFactory.createForClass(DataPoint);
DataPointSchema.index({ device: 1, createdAt: -1 });
