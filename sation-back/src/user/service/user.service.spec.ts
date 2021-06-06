import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RefreshTokenEntity } from 'src/auth/models/refresh-token.entity';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { UserModule } from '../user.module';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let repositoryMock_1: MockType<Repository<UserEntity>>;
  let repositoryMock_2: MockType<Repository<RefreshTokenEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET')
          })
        })
      ],
      providers: [
        UserService,
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: repositoryMockFactory
        },
        {
          provide: getRepositoryToken(RefreshTokenEntity),
          useFactory: repositoryMockFactory
        }
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    repositoryMock_1 = module.get(getRepositoryToken(UserEntity));
    repositoryMock_2 = module.get(getRepositoryToken(RefreshTokenEntity));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
});

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
  create: jest.fn(entity => entity)
  // ...
}));

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};