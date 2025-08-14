import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DataPoint } from './schemas/dataPoint.schema';
import { DataPointRepositoryInterface } from './interfaces/dataPoint.repository.interface';

import { DataPointCreateDto } from './dtos/dataPoint-create.dto';

@Injectable()
export class DataPointRepository implements DataPointRepositoryInterface {
  constructor(
    @InjectModel(DataPoint.name) private dataPointModel: Model<DataPoint>,
  ) {}

  async create(body: DataPointCreateDto): Promise<DataPoint> {
    const createdDataPoint = await this.dataPointModel.create(body);
    return createdDataPoint;
  }

  async find(): Promise<DataPoint[]> {
    return await this.dataPointModel.find();
  }
}
