import { Body, Controller, Post } from '@nestjs/common';

import { Device } from './schemas/device.schema';
import { DeviceService } from './device.service';

import { DeviceCreateDto } from './dtos/device-create.dto';

@Controller('devices')
export class DeviceController {
  constructor(private service: DeviceService) {}

  @Post()
  async create(@Body() body: DeviceCreateDto): Promise<Device> {
    return await this.service.create(body);
  }
}
