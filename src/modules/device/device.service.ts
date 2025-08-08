import { Injectable } from '@nestjs/common';

import { DeviceRepository } from './device.repository';
import { Device } from './schemas/device.schema';

import { DeviceCreateDto } from './dtos/device-create.dto';

@Injectable()
export class DeviceService {
  constructor(private repository: DeviceRepository) {}

  async create(body: DeviceCreateDto): Promise<Device> {
    try {
      const device: Device = await this.repository.create(body);
      return device;
    } catch (error: any) {
      throw error;
    }
  }
}
