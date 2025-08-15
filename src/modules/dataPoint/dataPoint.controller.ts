import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

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

  @Get('period-and-device/:id')
  async findByPeriodAndDevice(
    @Query('from') from: string,
    @Query('to') to: string,
    @Param('id') deviceId: string,
  ): Promise<DataPoint[]> {
    return await this.service.findByPeriodAndDevice(from, to, deviceId);
  }
}
