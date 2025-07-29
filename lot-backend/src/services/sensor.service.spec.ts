import { SensorService } from './sensor.service';
import { AppDataSource } from '../config/data-source';
import { SensorData } from '../entities/SensorData';
import { AuthService } from './auth.service';
import { SensorDataDto } from '../dto/sensor-data.dto';
import { maskDeviceId } from '../utils/mask';
import { calculateSpeed } from '../utils/geo-utils';

jest.mock('../config/data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  }
}));
jest.mock('./auth.service');
jest.mock('../utils/mask', () => ({
  maskDeviceId: jest.fn((id) => `masked-${id}`),
}));
jest.mock('../utils/geo-utils', () => ({
  calculateSpeed: jest.fn(() => 42),
}));

describe('SensorService', () => {
  let service: SensorService;
  let repoMock: any;

  beforeEach(() => {
    repoMock = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      createQueryBuilder: jest.fn(),
    };
    (AppDataSource.getRepository as jest.Mock).mockReturnValue(repoMock);
    service = new SensorService();
  });

  describe('save', () => {
    it('should create and save sensor entity', async () => {
      const dto: SensorDataDto = {
        deviceId: 'DVC001',
        gps: { lat: 1, lng: 2, speed: 60 },
        temperature: 25,
        fuel: { current: 50, capacity: 60 },
        createdAt: new Date().toISOString()
      };
      repoMock.create.mockReturnValue(dto);
      repoMock.save.mockResolvedValue(dto);

      const result = await service.save(dto);
      expect(repoMock.create).toHaveBeenCalledWith(expect.objectContaining({
        deviceId: 'DVC001'
      }));
      expect(repoMock.save).toHaveBeenCalled();
      expect(result).toEqual(dto);
    });
  });

  describe('findHistoryBydeviceId', () => {
    it('should return sorted history', async () => {
      const mockResult = [{ deviceId: 'DVC001' }];
      repoMock.find.mockResolvedValue(mockResult);

      const result = await service.findHistoryBydeviceId('DVC001');
      expect(repoMock.find).toHaveBeenCalledWith({
        where: { deviceId: 'DVC001' },
        order: { createdAt: 'DESC' },
      });
      expect(result).toEqual(mockResult);
    });
  });

  describe('getHistoryByActiveAlarms', () => {
    it('should filter by alarms and return DTOs', async () => {
      const mockUser = { isAdmin: () => true };
      (AuthService.prototype.getUserFromToken as jest.Mock).mockResolvedValue(mockUser);

      const sensorEntities = [
        { toDto: () => ({ gps: { speed: 0 }, fuel: { current: 10 }, }) },
        { toDto: () => ({ gps: { speed: 30 }, fuel: { current: 0.5 }, }) }
      ];

      repoMock.createQueryBuilder.mockReturnValue({
        distinctOn: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        addOrderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(sensorEntities),
      });

      const result = await service.getHistoryByActiveAlarms('token');
      expect(result.length).toBe(2);
    });

    it('should throw if user is not found', async () => {
      (AuthService.prototype.getUserFromToken as jest.Mock).mockResolvedValue(null);
      await expect(service.getHistoryByActiveAlarms('invalid')).rejects.toEqual('User not Exist');
    });
  });

  describe('processSensorData', () => {
    it('should calculate speed and save if changed', async () => {
      repoMock.findOne.mockResolvedValue({
        latitude: 1,
        longitude: 2,
        createdAt: new Date(),
        currentFuelLiters: 40
      });

      const dto: SensorDataDto = {
        deviceId: 'DVC001',
        temperature: 80,
        gps: { lat: 3, lng: 4, speed: 0 },
        fuel: { current: 30, capacity: 60 },
        createdAt: new Date().toISOString()
      };

      service.save = jest.fn().mockResolvedValue(undefined);

      const result = await service.processSensorData(dto);
      expect(calculateSpeed).toHaveBeenCalled();
      expect(service.save).toHaveBeenCalled();
      expect(result.lowFuelAlert).toBe(false);
    });
  });

  describe('getLatestPosition', () => {
    it('should return masked deviceId if not admin', async () => {
      (AuthService.prototype.getUserFromToken as jest.Mock).mockResolvedValue({
        isAdmin: () => false
      });

      const sensor: SensorData = {
        deviceId: 'DVC001',
        latitude: 1,
        longitude: 1,
        createdAt: new Date(),
        speed: 50,
        temperature: 22,
        currentFuelLiters: 40,
        fuelCapacityLiters: 60,
      } as SensorData;

      repoMock.findOne.mockResolvedValue(sensor);
      const result = await service.getLatestPosition('DVC001', 'token');
      expect(maskDeviceId).toHaveBeenCalledWith('DVC001');
      expect(result?.deviceId).toBe('masked-DVC001');
    });

    it('should throw if user does not exist', async () => {
      (AuthService.prototype.getUserFromToken as jest.Mock).mockResolvedValue(null);
      await expect(service.getLatestPosition('DVC001', 'token')).rejects.toEqual('User not Exist');
    });
  });
});