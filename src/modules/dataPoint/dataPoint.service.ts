import { Injectable } from '@nestjs/common';

import { DataPoint } from './schemas/dataPoint.schema';
import { DataPointRepository } from './dataPoint.repository';

import { DataPointCreateDto } from './dtos/dataPoint-create.dto';

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
      return this.repository.findLastsByDevices();
    } catch (error: any) {
      throw error;
    }
  }
}
