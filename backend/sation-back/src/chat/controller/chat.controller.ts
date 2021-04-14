import { Body, Controller, Post } from '@nestjs/common';
import { text } from 'express';
import { ChatService } from '../service/chat.service';

@Controller('chat')
export class ChatController {

  constructor(
    private chatService: ChatService,
  ){}


}
