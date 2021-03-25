import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth/auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenEntity } from 'src/auth/models/refresh-token.entity';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET')
      })
    }),
    TypeOrmModule.forFeature([RefreshTokenEntity])
    
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService]
})
export class AuthModule { }
