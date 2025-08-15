import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

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

  async findLastsByDevices(): Promise<DataPoint[]> {
    return await this.dataPointModel.aggregate([
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: '$device',
          latestValue: { $first: '$value' },
          latestTimestamp: { $first: '$createdAt' },
        },
      },
      {
        $lookup: {
          from: 'devices',
          localField: '_id',
          foreignField: '_id',
          as: 'device',
        },
      },
      { $unwind: '$device' },
      {
        $project: {
          _id: 0,
          deviceId: '$_id',
          deviceName: '$device.name',
          deviceType: '$device.type',
          latestValue: 1,
          latestTimestamp: 1,
        },
      },
    ]);
  }

  async findByPeriodAndDevice(
    from: string,
    to: string,
    deviceId: string,
  ): Promise<DataPoint[]> {
    return await this.dataPointModel.aggregate([
      {
        $match: {
          device: new mongoose.Types.ObjectId(deviceId),
          createdAt: { $gte: new Date(from), $lte: new Date(to) },
        },
      },
    ]);
  }
}
