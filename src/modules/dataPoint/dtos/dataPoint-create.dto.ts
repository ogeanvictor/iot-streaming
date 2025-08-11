import { IsEnum, IsMongoId, IsNumber } from 'class-validator';

import { DataPointEnum } from '../schemas/dataPoint-type.enum';

export class DataPointCreateDto {
  @IsMongoId()
  device: string;

  @IsEnum(DataPointEnum)
  type: DataPointEnum;

  @IsNumber()
  value: number;
}
