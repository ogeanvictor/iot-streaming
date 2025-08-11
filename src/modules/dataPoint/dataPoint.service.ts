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
}
