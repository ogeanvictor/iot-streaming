import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';

import { Device } from './schemas/device.schema';
import { DeviceService } from './device.service';

import { DeviceCreateDto } from './dtos/device-create.dto';

@Controller('devices')
export class DeviceController {
  constructor(private service: DeviceService) {}

  @ApiCreatedResponse({
    description: 'Device created successfully.',
    type: Device,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @Post()
  async create(@Body() body: DeviceCreateDto): Promise<Device> {
    return await this.service.create(body);
  }

  @ApiCreatedResponse({
    description: 'Device findAll successfully.',
    type: [Device],
  })
  @ApiBadRequestResponse({ description: 'Error' })
  @Get()
  async findAll(): Promise<Device[]> {
    return await this.service.findAll();
  }
}
