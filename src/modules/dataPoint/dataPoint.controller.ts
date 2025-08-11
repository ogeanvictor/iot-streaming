import { Body, Controller, Post } from '@nestjs/common';

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
}
