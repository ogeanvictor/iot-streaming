import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';

import { Device } from '../device/schemas/device.schema';
import { DataPoint } from '../dataPoint/schemas/dataPoint.schema';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel('Device') private deviceModel: Model<Device>,
    @InjectModel('DataPoint') private dataPointModel: Model<DataPoint>,
  ) {}

  async simulateData() {
    const devices = await this.deviceModel.find();

    for (const dev of devices) {
      const dataPoint = new this.dataPointModel({
        device: dev._id,
        type: dev.type,
        value: +(Math.random() * 40).toFixed(2),
      });

      await dataPoint.save();
    }
  }

  @Cron('* 30 * * * *')
  async handleCron() {
    await this.simulateData();
  }
}
