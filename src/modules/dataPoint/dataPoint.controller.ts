import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

import { DataPoint } from './schemas/dataPoint.schema';
import { DataPointService } from './dataPoint.service';

import { DataPointCreateDto } from './dtos/dataPoint-create.dto';
import { DataPointAverage } from './dtos/dataPoint-average.dto';
import { DataPointTopDevice } from './dtos/dataPoint-top-device.dto';

@Controller('dataPoint')
export class DataPointController {
  constructor(private service: DataPointService) {}

  @ApiCreatedResponse({
    description: 'DataPoint created successfully.',
    type: DataPoint,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @Post()
  async create(@Body() body: DataPointCreateDto): Promise<DataPoint> {
    return await this.service.create(body);
  }

  @ApiCreatedResponse({
    description: 'DataPoint findAll successfully.',
    type: [DataPoint],
  })
  @ApiBadRequestResponse({ description: 'Error.' })
  @Post()
  @Get()
  async find(): Promise<DataPoint[]> {
    return await this.service.find();
  }

  @ApiCreatedResponse({
    description: 'DataPoint findLatestsByDevices successfully.',
    type: [DataPoint],
  })
  @ApiBadRequestResponse({ description: 'Error.' })
  @Get('latest-by-devices')
  async findLatestsByDevices(): Promise<DataPoint[]> {
    return await this.service.findLastsByDevices();
  }

  @ApiCreatedResponse({
    description: 'DataPoint findByPeriodAndDevice successfully.',
    type: [DataPoint],
  })
  @ApiBadRequestResponse({ description: 'Error.' })
  @ApiQuery({ name: 'from', example: '2025-08-12' })
  @ApiQuery({ name: 'to', example: '2025-08-13' })
  @ApiParam({ name: 'id', example: '689649ee15f00cd418d4de00' })
  @Get('period-and-device/:id')
  async findByPeriodAndDevice(
    @Query('from') from: string,
    @Query('to') to: string,
    @Param('id') deviceId: string,
  ): Promise<DataPoint[]> {
    return await this.service.findByPeriodAndDevice(from, to, deviceId);
  }

  @ApiCreatedResponse({
    description: 'DataPoint findAverageByDevice successfully.',
    type: [DataPointAverage],
  })
  @ApiBadRequestResponse({ description: 'Error.' })
  @ApiParam({ name: 'id', example: '689649ee15f00cd418d4de00' })
  @Get('average-device/:id')
  async findAverageByDevice(
    @Param('id') deviceId: string,
  ): Promise<DataPointAverage[]> {
    return await this.service.findAverageByDevice(deviceId);
  }

  @ApiCreatedResponse({
    description: 'DataPoint findTopDevices successfully.',
    type: [DataPointTopDevice],
  })
  @ApiBadRequestResponse({ description: 'Error.' })
  @ApiQuery({ name: 'from', example: '2025-08-12' })
  @ApiQuery({ name: 'to', example: '2025-08-13' })
  async findTopDevices(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ): Promise<DataPointTopDevice[]> {
    return await this.service.findTopDevices(from, to);
  }
}
