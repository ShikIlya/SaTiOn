import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { UserI } from 'src/user/models/user.interface';
import { UserService } from 'src/user/service/user.service';
import { ChatTicketI } from '../models/chat-ticket.interface';
import { ChatI } from '../models/chat.interface';
import { TicketDto } from '../models/dto/chat-ticket.dto';
import { ChatDto } from '../models/dto/chat.dto';
import { MessageDto } from '../models/dto/message.dto';
import { MessageI } from '../models/message.interface';
import { ChatService } from '../service/chat.service';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private chatService: ChatService,
    private userService: UserService,
  ) {}

  private logger: Logger = new Logger('MessageGateway');

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('JoinChat')
  joinChat(client: Socket, data: any) {
    return this.userService.checkLogin(data.chatInfo.invitedLogin).pipe(
      switchMap((user: UserI) => {
        return this.chatService
          .createChat({
            ...ChatDto,
            name: data.chatInfo.chatName,
            creatorId: data.user.id,
          })
          .pipe(
            switchMap((chat: ChatI) => {
              return forkJoin([
                this.chatService.createOneTicket({
                  ...TicketDto,
                  chatId: chat.id,
                  memberId: user.id,
                }),
                this.chatService.createOneTicket({
                  ...TicketDto,
                  chatId: chat.id,
                  memberId: data.user.id,
                }),
              ]).pipe(
                map((tickets: ChatTicketI[]) => {
                  return this.server
                    .to(user.login)
                    .to(data.user.login)
                    .emit('JoinedChat', chat);
                }),
              );
            }),
          );
      }),
    );
  }

  @SubscribeMessage('DeleteChat')
  deleteChat(client: Socket, data: any) {
    return this.chatService.deleteChat(data.chatId).pipe(
      map((result: boolean) => {
        if (result)
          return this.server.to(data.chatId).emit('Chat deleted', data.chatId);
        else throw new WsException('Chat ne udalilsya!');
      }),
    );
  }

  @SubscribeMessage('DeleteMessage')
  deleteMessage(client: Socket, data: any) {
    return this.chatService.deleteMessage(data.messageId).pipe(
      map((result: boolean) => {
        if (result) return this.server.to(data.chatId).emit(data.messageId);
        else throw new WsException('Message ne udalilos!');
      }),
    );
  }

  @SubscribeMessage('EditMessage')
  editMessage(client: Socket, data: any) {
    return this.chatService.updateMessage(data.messageId, data.newContent).pipe(
      map((result: any) => {
        if (result) return this.server.to(data.chatId).emit(data);
        else throw new WsException('Oshibka vishla!');
      }),
    );
  }

  @SubscribeMessage('msgToServer')
  listen(client: Socket, data: MessageDto) {
    return this.chatService.sendMessage(data).pipe(
      map((message: MessageI) => {
        return this.server.to(message.chatId).emit('msgToClient', message);
      }),
    );
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

  afterInit(server: Server): void {
    return this.logger.log('Init');
  }

  handleDisconnect(client: Socket): void {
    return this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket): void {
    return this.logger.log(`Client connected: ${client.id}`);
  }
}
