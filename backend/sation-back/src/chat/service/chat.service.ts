import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createConnection, DeleteResult, getRepository, Repository } from 'typeorm';
import { ChatTicketEntity } from '../models/chat-ticket.entity';
import { ChatTicketI } from '../models/chat-ticket.interface';
import { ChatEntity } from '../models/chat.entity';
import { ChatI } from '../models/chat.interface';
import { TicketDto } from '../models/dto/chat-ticket.dto';
import { ChatDto } from '../models/dto/chat.dto';
import { MessageDto } from '../models/dto/message.dto';
import { MessageEntity } from '../models/message.entity';
import { MessageI } from '../models/message.interface';

@Injectable()
export class ChatService {

  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatI>,
    @InjectRepository(ChatTicketEntity)
    private ticketRepository: Repository<ChatTicketI>,
    @InjectRepository(MessageEntity)
    private messagerepository: Repository<MessageI>
  ) { }

  getChatsByUser(id: number): Observable<ChatI[]>{
    return from(this.chatRepository
      .createQueryBuilder('chat')
      .innerJoin('chat.tickets', 'tickets')
      .where('tickets.memberId = :id', {id: id})
      .getMany())
  }

  createChat(chatDto: ChatDto): Observable<ChatI>{
    return from(this.chatRepository.save(chatDto));
  }


  deleteChat(chatId: string): Observable<boolean>{
    return from(this.chatRepository.delete({id : chatId})).pipe(
      map((result: DeleteResult)=>{
        if (result.affected)
          return true;
        else
          return false;
      })
    )
  }
  
  createOneTicket(ticketDto: TicketDto): Observable<ChatTicketI>{
    return from(this.ticketRepository.save(ticketDto));
  }

  // createManyTickets(): Observable<ChatTicketI[]>{
  //   return from(this.ticketRepository.save());
  // }

  deleteTicket(ticketId: number): Observable<boolean>{
    return from(this.ticketRepository.delete({id : ticketId})).pipe(
      map((result: DeleteResult)=>{
        if (result.affected)
          return true;
        else
          return false;
      })
    )
  }

  sendMessage(messageDto: MessageDto): Observable<MessageI>{
    return from(this.messagerepository.save(messageDto));
  }

  getAllChatMessages(chatId: string): Observable<any>{
    return from(this.chatRepository
      .createQueryBuilder('chat')
      .innerJoin('chat.messages', 'message')
      .where('message.chatId = :id', {id: chatId})
      .innerJoin('user.messages', 'message')
      .getMany())
  }

  deleteMessage(messageId: number): Observable<boolean>{
    return from(this.messagerepository.delete({id : messageId})).pipe(
      map((result: DeleteResult)=>{
        if (result.affected)
          return true;
        else
          return false;
      })
    )
  }
}
