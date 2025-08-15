import { DataPoint } from '../schemas/dataPoint.schema';
import { DataPointCreateDto } from '../dtos/dataPoint-create.dto';

export abstract class DataPointRepositoryInterface {
  abstract create(body: DataPointCreateDto): Promise<DataPoint>;
  abstract find(): Promise<DataPoint[]>;
  abstract findLastsByDevices(): Promise<DataPoint[]>;
  abstract findByPeriodAndDevice(
    from: string,
    to: string,
    deviceId: string,
  ): Promise<DataPoint[]>;
}
