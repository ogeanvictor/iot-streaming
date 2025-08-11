import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Device, DeviceSchema } from './schemas/device.schema';

import { DeviceService } from './device.service';
import { DeviceRepository } from './device.repository';
import { DeviceController } from './device.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
  ],
  controllers: [DeviceController],
  providers: [DeviceService, DeviceRepository],
})
export class DeviceModule {}
