import { DataPoint } from '../schemas/dataPoint.schema';
import { DataPointCreateDto } from '../dtos/dataPoint-create.dto';

export abstract class DataPointRepositoryInterface {
  abstract create(body: DataPointCreateDto): Promise<DataPoint>;
}
