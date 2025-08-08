import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Device } from './schemas/device.schema';
import { DeviceRepositoryInterface } from './interfaces/device.repository.interface';

import { DeviceCreateDto } from './dtos/device-create.dto';

export class DeviceRepository implements DeviceRepositoryInterface {
  constructor(
    @InjectModel(Device.name) private readonly deviceModel: Model<Device>,
  ) {}

  async create(body: DeviceCreateDto): Promise<Device> {
    const createdDevice = await this.deviceModel.create(body);
    return createdDevice;
  }
}
