/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';

import { DataPoint } from './schemas/dataPoint.schema';
import { DeviceType } from '../device/schemas/device-type.enum';
import { DataPointEnum } from './schemas/dataPoint-type.enum';
import { DataPointRepository } from './dataPoint.repository';
import { DataPointService } from './dataPoint.service';
import { RedisService } from '../redis/redis.service';
import { DataPointAverage } from './dtos/dataPoint-average.dto';
import { DataPointTopDevice } from './dtos/dataPoint-top-device.dto';

describe('DataPointService', () => {
  let service: DataPointService;
  let repository: jest.Mocked<DataPointRepository>;
  let redisService: jest.Mocked<RedisService>;

  const deviceMocked = {
    name: 'Device test',
    location: 'teste',
    type: DeviceType.GPS,
    createdAt: new Date(),
  };

  const expectedDataPointMocked: DataPoint[] = [
    {
      value: 12.32,
      device: deviceMocked,
      type: DataPointEnum.GPS,
      createdAt: new Date(),
    },
  ];

  const expectedDataPointAverage: DataPointAverage[] = [
    {
      average: 23.2,
      max: 29.23,
      min: 12.11,
    },
  ];

  const expectedDataPointTop: DataPointTopDevice[] = [
    {
      name: 'test',
      avg: 45.23,
      min: 20.12,
      max: 50.21,
      total: 430,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataPointService,
        {
          provide: DataPointRepository,
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findLastsByDevices: jest.fn(),
            findByPeriodAndDevice: jest.fn(),
            findAverageByDevice: jest.fn(),
            findTopDevices: jest.fn(),
          },
        },
        {
          provide: RedisService,
          useValue: {
            set: jest.fn(),
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DataPointService>(DataPointService);
    repository = module.get(DataPointRepository);
    redisService = module.get(RedisService);
  });

  describe('find', () => {
    it('should be able to return all dataPoints from cache', async () => {
      const cacheKey = 'dataPoints-find';
      redisService.get.mockResolvedValue(expectedDataPointMocked);

      const result = await service.find();

      expect(redisService.get).toHaveBeenCalledWith(cacheKey);
      expect(repository.find).not.toHaveBeenCalled();
      expect(result).toEqual(expectedDataPointMocked);
    });

    it('should be able to return all dataPoints from repository', async () => {
      const cacheKey = 'dataPoints-find';
      redisService.get.mockResolvedValue(null);
      repository.find.mockResolvedValue(expectedDataPointMocked);

      const result = await service.find();

      expect(redisService.get).toHaveBeenCalledWith(cacheKey);
      expect(repository.find).toHaveBeenCalled();
      expect(redisService.set).toHaveBeenCalledWith(
        cacheKey,
        expectedDataPointMocked,
      );
      expect(result).toEqual(expectedDataPointMocked);
    });
  });

  describe('findLastsByDevices', () => {
    it('should be able to return lasts dataPoints from cache', async () => {
      const cacheKey = 'dataPoints-findLasts';
      redisService.get.mockResolvedValue(expectedDataPointMocked);

      const result = await service.findLastsByDevices();

      expect(redisService.get).toHaveBeenCalledWith(cacheKey);
      expect(repository.findLastsByDevices).not.toHaveBeenCalled();
      expect(result).toEqual(expectedDataPointMocked);
    });

    it('should be able to return lasts dataPoints from repository', async () => {
      const cacheKey = 'dataPoints-findLasts';
      redisService.get.mockResolvedValue(null);
      repository.findLastsByDevices.mockResolvedValue(expectedDataPointMocked);

      const result = await service.findLastsByDevices();

      expect(redisService.get).toHaveBeenCalledWith(cacheKey);
      expect(repository.findLastsByDevices).toHaveBeenCalled();
      expect(redisService.set).toHaveBeenCalledWith(
        cacheKey,
        expectedDataPointMocked,
      );
      expect(result).toEqual(expectedDataPointMocked);
    });
  });

  describe('findByPeriodAndDevie', () => {
    it('should return dataPoints in period and device from cache', async () => {
      const from = new Date().toISOString();
      const to = new Date().toISOString();
      const deviceId = '689649ee15f00cd418d4de00';

      const cacheKey = `dataPoints-period-${from}/${to}-device-${deviceId}`;
      redisService.get.mockResolvedValue(expectedDataPointMocked);

      const result = await service.findByPeriodAndDevice(from, to, deviceId);

      expect(redisService.get).toHaveBeenCalledWith(cacheKey);
      expect(repository.findByPeriodAndDevice).not.toHaveBeenCalled();
      expect(result).toEqual(expectedDataPointMocked);
    });

    it('should return dataPoints in period and device from repository', async () => {
      const from = new Date().toISOString();
      const to = new Date().toISOString();
      const deviceId = '689649ee15f00cd418d4de00';

      const cacheKey = `dataPoints-period-${from}/${to}-device-${deviceId}`;
      redisService.get.mockResolvedValue(null);
      repository.findByPeriodAndDevice.mockResolvedValue(
        expectedDataPointMocked,
      );

      const result = await service.findByPeriodAndDevice(from, to, deviceId);

      expect(redisService.get).toHaveBeenCalledWith(cacheKey);
      expect(repository.findByPeriodAndDevice).toHaveBeenCalledWith(
        from,
        to,
        deviceId,
      );
      expect(redisService.set).toHaveBeenCalledWith(
        cacheKey,
        expectedDataPointMocked,
      );
      expect(result).toEqual(expectedDataPointMocked);
    });
  });

  describe('findAverageByDevice', () => {
    it('should be able to return average device from cache', async () => {
      const deviceId = '689649ee15f00cd418d4de00';
      const cacheKey = `dataPoints-average-device-${deviceId}`;

      redisService.get.mockResolvedValue(expectedDataPointAverage);

      const result = await service.findAverageByDevice(deviceId);

      expect(redisService.get).toHaveBeenCalledWith(cacheKey);
      expect(repository.findAverageByDevice).not.toHaveBeenCalled();
      expect(result).toEqual(expectedDataPointAverage);
    });
  });

  it('should be able to return average device from repository', async () => {
    const deviceId = '689649ee15f00cd418d4de00';
    const cacheKey = `dataPoints-average-device-${deviceId}`;

    redisService.get.mockResolvedValue(null);
    repository.findAverageByDevice.mockResolvedValue(expectedDataPointAverage);

    const result = await service.findAverageByDevice(deviceId);

    expect(redisService.get).toHaveBeenCalledWith(cacheKey);
    expect(repository.findAverageByDevice).toHaveBeenCalledWith(deviceId);
    expect(redisService.set).toHaveBeenCalledWith(cacheKey, result);
    expect(result).toEqual(expectedDataPointAverage);
  });

  describe('findTopDevices', () => {
    it('should be able to return top devices device from cache', async () => {
      const from = new Date().toISOString();
      const to = new Date().toISOString();
      const cacheKey = `dataPoints-topDevice-${from}/${to}`;

      redisService.get.mockResolvedValue(expectedDataPointTop);

      const result = await service.findTopDevices(from, to);

      expect(redisService.get).toHaveBeenCalledWith(cacheKey);
      expect(repository.findTopDevices).not.toHaveBeenCalled();
      expect(result).toEqual(expectedDataPointTop);
    });
  });

  it('should be able to return average device from repository', async () => {
    const from = new Date().toISOString();
    const to = new Date().toISOString();
    const cacheKey = `dataPoints-topDevice-${from}/${to}`;

    redisService.get.mockResolvedValue(null);
    repository.findTopDevices.mockResolvedValue(expectedDataPointTop);

    const result = await service.findTopDevices(from, to);

    expect(redisService.get).toHaveBeenCalledWith(cacheKey);
    expect(repository.findTopDevices).toHaveBeenCalledWith(from, to);
    expect(redisService.set).toHaveBeenCalledWith(cacheKey, result);
    expect(result).toEqual(expectedDataPointTop);
  });
});
