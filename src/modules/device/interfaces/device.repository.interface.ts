import { Device } from '../schemas/device.schema';
import { DeviceCreateDto } from '../dtos/device-create.dto';

export abstract class DeviceRepositoryInterface {
  abstract create(body: DeviceCreateDto): Promise<Device>;
}
