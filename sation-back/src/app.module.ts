import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const modules = [
  ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', './.env'] }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    autoLoadEntities: true,
    synchronize: true,
    url: process.env.DATABASE_URL,
  }),
  UserModule,
  AuthModule,
  ChatModule,
];

if (process.env.NODE_ENV !== 'development') {
  modules.push(
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '', 'build/sation'),
    }),
  );
}

@Module({
  imports: modules,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
