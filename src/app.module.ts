import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DeviceModule } from './modules/device/device.module';
import { DataPointModule } from './modules/dataPoint/dataPoint.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/database-iot'),
    DeviceModule,
    DataPointModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
