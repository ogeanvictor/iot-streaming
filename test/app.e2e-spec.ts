/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/dataPoint/ (GET)', () => {
    it('should be able to return all datapoints', async () => {
      const response = await request(app.getHttpServer())
        .get('/dataPoint/')
        .expect(200);

      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);

      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty('_id');
        expect(response.body[0]).toHaveProperty('value');
        expect(response.body[0]).toHaveProperty('type');
        expect(response.body[0]).toHaveProperty('createdAt');
        expect(response.body[0]).toHaveProperty('device');
      }
    });
  });

  describe('/dataPoint/latest-by-devices (GET)', () => {
    it('should be able to return the last datapoints from devices', async () => {
      const response = await request(app.getHttpServer())
        .get('/dataPoint/latest-by-devices')
        .expect(200);

      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);

      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty('latestValue');
        expect(response.body[0]).toHaveProperty('latestTimestamp');
        expect(response.body[0]).toHaveProperty('deviceId');
        expect(response.body[0]).toHaveProperty('deviceName');
        expect(response.body[0]).toHaveProperty('deviceType');
      }
    });
  });

  describe('dataPoint/period-and-device/:id (GET)', () => {
    it('should be able to return datapoints in period and from device', async () => {
      const from = new Date().toISOString().substring(0, 10);
      const to = new Date().toISOString().substring(0, 10);
      const deviceId = '689bc3154970da1d787a4cb7';

      const response = await request(app.getHttpServer())
        .get(`/dataPoint/period-and-device/${deviceId}?from=${from}&to=${to}`)
        .expect(200);

      expect(response.body).toBeDefined();

      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty('_id');
        expect(response.body[0]).toHaveProperty('value');
        expect(response.body[0]).toHaveProperty('type');
        expect(response.body[0]).toHaveProperty('createdAt');
        expect(response.body[0].device).toBe(deviceId);
      }
    });

    it('should be to return a error for inexist device id', async () => {
      const from = new Date().toISOString();
      const to = new Date().toISOString();
      const deviceId = 'inexist-id';

      const response = await request(app.getHttpServer())
        .get(`/dataPoint/period-and-device/${deviceId}?from=${from}&to=${to}`)
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('statusCode');
    });
  });

  describe('dataPoint/average-device/:id (GET)', () => {
    it('should be able to return average from device', async () => {
      const deviceId = '689bc3154970da1d787a4cb7';

      const response = await request(app.getHttpServer())
        .get(`/dataPoint/average-device/${deviceId}`)
        .expect(200);

      expect(response.body).toBeDefined();

      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty('average');
        expect(response.body[0]).toHaveProperty('max');
        expect(response.body[0]).toHaveProperty('min');
      }
    });

    it('should not be able to return average from inexist device', async () => {
      const deviceId = 'inexist device';

      const response = await request(app.getHttpServer())
        .get(`/dataPoint/average-device/${deviceId}`)
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('statusCode');
    });
  });

  describe('dataPoint/top-devices (GET)', () => {
    it('should be able to return top devices', async () => {
      const from = new Date().toISOString().substring(0, 10);
      const to = new Date().toISOString().substring(0, 10);

      const response = await request(app.getHttpServer())
        .get(`/dataPoint/top-devices?from=${from}&to=${to}`)
        .expect(200);

      expect(response.body).toBeDefined();

      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty('avg');
        expect(response.body[0]).toHaveProperty('max');
        expect(response.body[0]).toHaveProperty('min');
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('total');
      }
    });
  });
});
