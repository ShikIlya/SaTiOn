import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RefreshTokenEntity } from './models/refresh-token.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]),
        AuthModule
    ],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule { }
