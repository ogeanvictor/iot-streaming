import { IsEnum, IsMongoId, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { DataPointEnum } from '../schemas/dataPoint-type.enum';

export class DataPointCreateDto {
  @ApiProperty({
    example: '689649ee15f00cd418d4de00',
    description: 'Device Id',
  })
  @IsMongoId()
  device: string;

  @ApiProperty({ enum: ['temperature', 'gps'], description: 'Device type' })
  @IsEnum(DataPointEnum)
  type: DataPointEnum;

  @ApiProperty({
    example: 2.93,
    description: 'DataPoint value',
  })
  @IsNumber()
  value: number;
}
