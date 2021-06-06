import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';
import { ChatService } from './service/chat.service';
import { ChatController } from './controller/chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './models/chat.entity';
import { ChatTicketEntity } from './models/chat-ticket.entity';
import { MessageEntity } from './models/message.entity';
import { UserModule } from 'src/user/user.module';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [ChatEntity, ChatTicketEntity, MessageEntity]
    ),
    UserModule,
    AuthModule
  ],
  providers: [ChatService, ChatGateway],
  controllers: [ChatController]
})
export class ChatModule { }
