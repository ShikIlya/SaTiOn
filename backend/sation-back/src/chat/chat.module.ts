import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './service/chat.service';
import { ChatController } from './controller/chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './models/chat.entity';
import { ChatTicketEntity } from './models/chat-ticket.entity';
import { MessageEntity } from './models/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity, ChatTicketEntity, MessageEntity])],
  providers: [ChatService, ChatGateway],
  controllers: [ChatController]
})
export class ChatModule {}
