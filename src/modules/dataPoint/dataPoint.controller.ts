import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { DataPoint } from './schemas/dataPoint.schema';
import { DataPointService } from './dataPoint.service';

import { DataPointCreateDto } from './dtos/dataPoint-create.dto';
import { DataPointAverage } from './dtos/dataPoint-average.dto';
import { DataPointTopDevice } from './dtos/dataPoint-top-device.dto';

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

  @Get('average-device/:id')
  async findAverageByDevice(
    @Param('id') deviceId: string,
  ): Promise<DataPointAverage[]> {
    return await this.service.findAverageByDevice(deviceId);
  }

  @Get('top-devices')
  async findTopDevices(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ): Promise<DataPointTopDevice[]> {
    return await this.service.findTopDevices(from, to);
  }
}
