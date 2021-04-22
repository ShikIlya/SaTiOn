import { Body } from "@nestjs/common";
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { map } from "rxjs/operators";
import { Server } from 'socket.io'
import { MessageDto } from "../models/dto/message.dto";
import { MessageI } from "../models/message.interface";
import { ChatService } from "../service/chat.service";


@WebSocketGateway()
export class ChatGateway {

  constructor(
    private chatservice: ChatService,
  ) { }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  listen(@Body() message: MessageDto) {
    return this.chatservice.sendMessage(message).pipe(
      map((message: MessageI) => {
        this.server.sockets.emit('message', message);
      })
    )
  }

}