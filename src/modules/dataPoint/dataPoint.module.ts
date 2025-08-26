import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DataPoint, DataPointSchema } from './schemas/dataPoint.schema';

import { DataPointController } from './dataPoint.controller';
import { DataPointService } from './dataPoint.service';
import { DataPointRepository } from './dataPoint.repository';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DataPoint.name, schema: DataPointSchema },
    ]),
    RedisModule,
  ],
  controllers: [DataPointController],
  providers: [DataPointService, DataPointRepository],
})
export class DataPointModule {}
