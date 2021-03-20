import { forwardRef, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RefreshTokenEntity } from './models/refresh-token.entity';
import { SessionService } from './services/session.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshTokenEntity]),
    forwardRef(() => AuthModule)
  ],
  providers: [SessionService],
  exports: [SessionService]
})
export class SessionModule { }
