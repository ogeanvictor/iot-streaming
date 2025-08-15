import { Body, Controller, Get, Post } from '@nestjs/common';

import { DataPoint } from './schemas/dataPoint.schema';
import { DataPointService } from './dataPoint.service';

import { DataPointCreateDto } from './dtos/dataPoint-create.dto';

@Controller('dataPoint')
export class DataPointController {
  constructor(private service: DataPointService) {}

  @Post()
  async create(@Body() body: DataPointCreateDto): Promise<DataPoint> {
    return await this.service.create(body);
  }

  @Get()
  async find(): Promise<DataPoint[]> {
    return await this.service.find();
  }

  @Get('latest-by-devices')
  async findLatestsByDevices(): Promise<DataPoint[]> {
    return await this.service.findLastsByDevices();
  }
}
