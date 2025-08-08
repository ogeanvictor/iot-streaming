import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DeviceType } from '../schemas/device-type.enum';

export class DeviceCreateDto {
  @IsNotEmpty()
  name: string;

  @IsString()
  location: string;

  @IsEnum(DeviceType)
  type: DeviceType;
}
