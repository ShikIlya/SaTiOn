import { Body } from "@nestjs/common";
import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { map } from "rxjs/operators";
import { Server, Socket } from 'socket.io'
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

  @SubscribeMessage('msgToServer')
  listen(client: Socket, message: MessageDto, chatId: string) {
    return this.server.to(chatId).emit('msgToClient', message);
  }

  @SubscribeMessage('joinRoom')
  joinRoom(client: Socket, chatId: string): void {
    client.join(chatId);
    client.emit('joinedRoom', chatId);
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(client: Socket, chatId: string): void {
    client.leave(chatId);
    client.emit('leftRoom', chatId);
  }

}