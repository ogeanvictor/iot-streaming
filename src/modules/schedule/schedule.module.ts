import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Device, DeviceSchema } from '../device/schemas/device.schema';
import {
  DataPoint,
  DataPointSchema,
} from '../dataPoint/schemas/dataPoint.schema';

import { ScheduleService } from './schedule.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
    MongooseModule.forFeature([
      { name: DataPoint.name, schema: DataPointSchema },
    ]),
  ],
  providers: [ScheduleService],
})
export class ScheduleModule {}
