import { Document } from 'mongoose';

import { DeviceType } from '../schemas/device-type.enum';

export interface Device extends Document {
  readonly name: string;
  readonly location: string;
  readonly type: DeviceType;
  readonly createdAt: Date;
}
