import { ApiProperty } from '@nestjs/swagger';

export class DataPointTopDevice {
  @ApiProperty({
    example: 'Device Temperature',
    description: 'Device name',
  })
  name: string;

  @ApiProperty({
    example: 29.3,
    description: 'Datapoints value average',
  })
  avg: number;

  @ApiProperty({
    example: 12,
    description: 'Datapoints value min',
  })
  min: number;

  @ApiProperty({
    example: 23,
    description: 'Datapoints value max',
  })
  max: number;

  @ApiProperty({
    example: 90,
    description: 'Datapoints total',
  })
  total: number;
}
