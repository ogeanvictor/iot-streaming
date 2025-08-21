import { Injectable } from '@nestjs/common';

import { DataPoint } from './schemas/dataPoint.schema';
import { DataPointRepository } from './dataPoint.repository';

import { DataPointCreateDto } from './dtos/dataPoint-create.dto';
import { DataPointAverage } from './dtos/dataPoint-average.dto';
import { DataPointTopDevice } from './dtos/dataPoint-top-device.dto';

@Injectable()
export class DataPointService {
  constructor(private repository: DataPointRepository) {}

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
      return await this.repository.find();
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
