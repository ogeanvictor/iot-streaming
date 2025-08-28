import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { Device } from 'src/modules/device/schemas/device.schema';
import { DataPointEnum } from './dataPoint-type.enum';

@Schema()
export class DataPoint {
  @ApiProperty({
    example: '689649ee15f00cd418d4de00',
    description: 'Device Id',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true })
  device: Device;

  @ApiProperty({ enum: ['temperature', 'gps'], description: 'Device type' })
  @Prop({ type: String, enum: Object.values(DataPointEnum), required: true })
  type: DataPointEnum;

  @ApiProperty({
    example: 2.93,
    description: 'DataPoint value',
  })
  @Prop({ required: true })
  value: number;

  @ApiProperty({
    example: '2025-08-08T19:03:10.542+00:00',
    description: 'DataPoint createdAt',
  })
  @Prop({ default: now })
  createdAt: Date;
}
export const DataPointSchema = SchemaFactory.createForClass(DataPoint);
DataPointSchema.index({ device: 1, createdAt: -1 });
