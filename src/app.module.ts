import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { DeviceModule } from './modules/device/device.module';
import { DataPointModule } from './modules/dataPoint/dataPoint.module';
import { ScheduleDataPointModule } from './modules/schedule/schedule.module';
import { RedisModule } from './modules/redis/redis.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/database-iot'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DeviceModule,
    DataPointModule,
    ScheduleDataPointModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
