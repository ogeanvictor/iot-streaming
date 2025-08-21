import { DataPoint } from '../schemas/dataPoint.schema';
import { DataPointCreateDto } from '../dtos/dataPoint-create.dto';
import { DataPointAverage } from '../dtos/dataPoint-average.dto';
import { DataPointTopDevice } from '../dtos/dataPoint-top-device.dto';

export abstract class DataPointRepositoryInterface {
  abstract create(body: DataPointCreateDto): Promise<DataPoint>;
  abstract find(): Promise<DataPoint[]>;
  abstract findLastsByDevices(): Promise<DataPoint[]>;
  abstract findByPeriodAndDevice(
    from: string,
    to: string,
    deviceId: string,
  ): Promise<DataPoint[]>;
  abstract findAverageByDevice(deviceId: string): Promise<DataPointAverage[]>;
  abstract findTopDevices(
    from?: string,
    to?: string,
  ): Promise<DataPointTopDevice[]>;
}
