import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { DeviceType } from '../schemas/device-type.enum';

export class DeviceCreateDto {
  @ApiProperty({ example: 'device-name', description: 'Device name' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'device-location', description: 'Device location' })
  @IsString()
  location: string;

  @ApiProperty({ enum: ['temperature', 'gps'], description: 'Device type' })
  @IsEnum(DeviceType)
  type: DeviceType;
}
