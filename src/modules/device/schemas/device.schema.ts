import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { DeviceType } from './device-type.enum';

@Schema()
export class Device {
  @ApiProperty({
    example: 'Device 2',
    description: 'Device name',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: 'Device location',
    description: 'Device location',
  })
  @Prop()
  location: string;

  @ApiProperty({ enum: ['temperature', 'gps'], description: 'Device type' })
  @Prop({ type: String, enum: Object.values(DeviceType), required: true })
  type: DeviceType;

  @ApiProperty({
    example: '2025-08-08T19:03:10.542+00:00',
    description: 'Device createdAt',
  })
  @Prop({ default: now })
  createdAt: Date;
}
export const DeviceSchema = SchemaFactory.createForClass(Device);
