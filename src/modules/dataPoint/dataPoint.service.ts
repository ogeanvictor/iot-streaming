import { Injectable, Logger } from '@nestjs/common';

import { DataPoint } from './schemas/dataPoint.schema';
import { DataPointRepository } from './dataPoint.repository';

import { DataPointCreateDto } from './dtos/dataPoint-create.dto';
import { DataPointAverage } from './dtos/dataPoint-average.dto';
import { DataPointTopDevice } from './dtos/dataPoint-top-device.dto';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class DataPointService {
  constructor(
    private repository: DataPointRepository,
    private redisService: RedisService,
  ) {}

  private readonly logger = new Logger(DataPointService.name);

  async create(body: DataPointCreateDto): Promise<DataPoint> {
    try {
      const dataPoint: DataPoint = await this.repository.create(body);
      return dataPoint;
    } catch (error: any) {
      throw error;
    }
  }

  async find(): Promise<DataPoint[]> {
    try {
      const cacheKey: string = 'dataPoints-find';
      const cachedDataPoints =
        await this.redisService.get<DataPoint[]>(cacheKey);

      if (cachedDataPoints) {
        this.logger.log('Returning cached dataPoints data');
        return cachedDataPoints;
      }

      const dataPoints: DataPoint[] = await this.repository.find();
      await this.redisService.set(cacheKey, dataPoints);

      return dataPoints;
    } catch (error: any) {
      throw error;
    }
  }

  async findLastsByDevices(): Promise<DataPoint[]> {
    try {
      return await this.repository.findLastsByDevices();
    } catch (error: any) {
      throw error;
    }
  }

  async findByPeriodAndDevice(
    from: string,
    to: string,
    deviceId: string,
  ): Promise<DataPoint[]> {
    try {
      return await this.repository.findByPeriodAndDevice(from, to, deviceId);
    } catch (error: any) {
      throw error;
    }
  }

  async findAverageByDevice(deviceId: string): Promise<DataPointAverage[]> {
    try {
      return await this.repository.findAverageByDevice(deviceId);
    } catch (error: any) {
      throw error;
    }
  }

  async findTopDevices(
    from?: string,
    to?: string,
  ): Promise<DataPointTopDevice[]> {
    try {
      return await this.repository.findTopDevices(from, to);
    } catch (error: any) {
      throw error;
    }
  }
}
