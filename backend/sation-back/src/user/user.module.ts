import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { SessionGuard } from 'src/auth/guards/session.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        AuthModule
    ],
    providers: [UserService, SessionGuard],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule { }
