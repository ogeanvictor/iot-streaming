import { ApiProperty } from '@nestjs/swagger';

export class DataPointAverage {
  @ApiProperty({
    example: 23.4,
    description: 'DataPoints value average',
  })
  average: number;

  @ApiProperty({
    example: 24,
    description: 'DataPoints value max',
  })
  max: number;

  @ApiProperty({
    example: 13.2,
    description: 'DataPoints value min',
  })
  min: number;
}
