import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, PipelineStage } from 'mongoose';

import { DataPoint } from './schemas/dataPoint.schema';
import { DataPointRepositoryInterface } from './interfaces/dataPoint.repository.interface';

import { DataPointCreateDto } from './dtos/dataPoint-create.dto';
import { DataPointAverage } from './dtos/dataPoint-average.dto';
import { DataPointTopDevice } from './dtos/dataPoint-top-device.dto';

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

  async findAverageByDevice(deviceId: string): Promise<DataPointAverage[]> {
    return await this.dataPointModel.aggregate([
      {
        $match: {
          device: new mongoose.Types.ObjectId(deviceId),
        },
      },
      {
        $group: {
          _id: '$device',
          average: { $avg: '$value' },
          min: { $min: '$value' },
          max: { $max: '$value' },
        },
      },
      {
        $project: {
          average: 1,
          min: 1,
          max: 1,
        },
      },
    ]);
  }

  async findTopDevices(
    from?: string,
    to?: string,
  ): Promise<DataPointTopDevice[]> {
    const pipeline: PipelineStage[] = [];

    if (from || to) {
      const createdAt: Record<string, Date> = {};
      if (from) createdAt.$gte = new Date(from);
      if (to) createdAt.$lte = new Date(to);

      pipeline.push({ $match: { createdAt } });
    }

    pipeline.push(
      {
        $group: {
          _id: '$device',
          avg: { $avg: '$value' },
          max: { $max: '$value' },
          min: { $min: '$value' },
          total: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
      {
        $lookup: {
          from: 'devices',
          localField: '_id',
          foreignField: '_id',
          as: 'device',
        },
      },
      {
        $project: {
          _id: 0,
          name: { $arrayElemAt: ['$device.name', 0] },
          avg: 1,
          min: 1,
          max: 1,
          total: 1,
        },
      },
    );

    return this.dataPointModel.aggregate(pipeline);
  }
}
