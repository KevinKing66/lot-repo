import { AuthService } from './auth.service';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import * as bcrypt from 'bcrypt';
import { JwtUtils } from '../utils/jwt';

jest.mock('../config/data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  }
}));
jest.mock('bcrypt');
jest.mock('../utils/jwt');

describe('AuthService', () => {
  let service: AuthService;
  let repoMock: any;

  beforeEach(() => {
    repoMock = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      findOneBy: jest.fn(),
    };
    (AppDataSource.getRepository as jest.Mock).mockReturnValue(repoMock);
    service = new AuthService();
  });

  describe('register', () => {
    it('should throw if email is already registered', async () => {
      repoMock.findOne.mockResolvedValue({ email: 'test@example.com' });

      const user = { email: 'test@example.com' } as User;
      await expect(service.register(user)).rejects.toThrow('Email already registered');
    });

    it('should create and save user if not registered', async () => {
      repoMock.findOne.mockResolvedValue(null);
      repoMock.create.mockReturnValue({ email: 'new@example.com' });
      repoMock.save.mockResolvedValue({ email: 'new@example.com' });

      const result = await service.register({ email: 'new@example.com' } as User);
      expect(repoMock.create).toHaveBeenCalledWith(expect.objectContaining({ email: 'new@example.com' }));
      expect(repoMock.save).toHaveBeenCalled();
      expect(result.email).toBe('new@example.com');
    });
  });

  describe('login', () => {
    it('should throw if user not found', async () => {
      repoMock.findOne.mockResolvedValue(null);
      await expect(service.login('notfound@example.com', 'password')).rejects.toThrow('User not found');
    });

    it('should throw on invalid password', async () => {
      repoMock.findOne.mockResolvedValue({ email: 'test@example.com', password: 'hashed' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login('test@example.com', 'wrongpassword')).rejects.toThrow('Invalid credentials');
    });

    it('should return token on valid credentials', async () => {
      const user = { id: 1, email: 'test@example.com', password: 'hashed', role: 'user' };
      repoMock.findOne.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (JwtUtils.generateToken as jest.Mock).mockReturnValue('mock-token');

      const result = await service.login('test@example.com', 'correctpassword');
      expect(result).toEqual({ token: 'mock-token' });
    });
  });

  describe('getUserFromToken', () => {
    it('should return user from decoded token', async () => {
      (JwtUtils.verifyToken as jest.Mock).mockReturnValue({ id: 42 });
      repoMock.findOneBy.mockResolvedValue({ id: 42, email: 'user@example.com' });

      const result = await service.getUserFromToken('Bearer mocktoken');
      expect(result).toEqual({ id: 42, email: 'user@example.com' });
    });

    it('should return null if token is invalid', async () => {
      (JwtUtils.verifyToken as jest.Mock).mockImplementation(() => { throw new Error('Invalid') });

      const result = await service.getUserFromToken('Bearer broken-token');
      expect(result).toBeNull();
    });
  });

  describe('verifyToken (static)', () => {
    it('should delegate to JwtUtils.verifyToken', () => {
      (JwtUtils.verifyToken as jest.Mock).mockReturnValue({ id: 1 });
      const result = AuthService.verifyToken('sample-token');
      expect(JwtUtils.verifyToken).toHaveBeenCalledWith('sample-token');
      expect(result).toEqual({ id: 1 });
    });
  });
});