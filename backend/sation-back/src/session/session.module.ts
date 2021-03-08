import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenEntity } from './models/refresh-token.entity';
import { SessionService } from './services/session.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshTokenEntity])
  ],
  providers: [SessionService],
  exports: [SessionService]
})
export class SessionModule { }
