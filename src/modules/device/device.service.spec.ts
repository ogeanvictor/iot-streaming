/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';

import { DeviceRepository } from './device.repository';
import { DeviceService } from './device.service';

import { Device } from './schemas/device.schema';
import { DeviceCreateDto } from './dtos/device-create.dto';
import { DeviceType } from './schemas/device-type.enum';

describe('Device Service', () => {
  let service: DeviceService;
  let repository: jest.Mocked<DeviceRepository>;

  const dtoMocked: DeviceCreateDto = {
    name: 'Device test',
    location: 'teste',
    type: DeviceType.GPS,
  };

  const expectedDeviceMocked: Device = {
    name: 'Device test',
    location: 'teste',
    type: DeviceType.GPS,
    createdAt: new Date(),
  };

  const expectedDeviceArray: Device[] = [
    {
      name: 'Device test',
      location: 'teste',
      type: DeviceType.GPS,
      createdAt: new Date(),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeviceService,
        {
          provide: DeviceRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DeviceService>(DeviceService);
    repository = module.get(DeviceRepository);
  });

  describe('create', () => {
    it('should be able to create a device with successfully', async () => {
      repository.create.mockResolvedValue(expectedDeviceMocked);

      const result = await service.create(dtoMocked);

      expect(repository.create).toHaveBeenCalledWith(dtoMocked);
      expect(result).toEqual(expectedDeviceMocked);
    });

    it('should not be able to create device and return a error', async () => {
      repository.create.mockRejectedValue(new Error('MongoDB Error'));

      await expect(service.create(dtoMocked)).rejects.toThrow('MongoDB Error');
    });
  });

  describe('findAll', () => {
    it('should be able to get all devices', async () => {
      repository.findAll.mockResolvedValue(expectedDeviceArray);

      const result = await service.findAll();

      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedDeviceArray);
    });
  });
});
