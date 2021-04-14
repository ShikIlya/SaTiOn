import { Body, Controller, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { text } from 'express';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserI } from 'src/user/models/user.interface';
import { UserService } from 'src/user/service/user.service';
import { ChatTicketI } from '../models/chat-ticket.interface';
import { ChatI } from '../models/chat.interface';
import { ChatInvitationDto } from '../models/dto/chat-invitation.dto';
import { ChatTicketDto } from '../models/dto/chat-ticket.dto';
import { ChatDto } from '../models/dto/chat.dto';
import { ChatService } from '../service/chat.service';

@Controller('chat')
export class ChatController {

  constructor(
    private chatService: ChatService,
    private userService: UserService
  ){}
  
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createChat(@Body() invitation: ChatInvitationDto, @Req() req){
    return this.userService.findOneByLogin(invitation.invitedLogin).pipe(
      switchMap((user: UserI)=>{
        if (user){
          const newChatDto: ChatDto = {
            name: invitation.chatName,
            creatorId: req.user.id
          }
          return this.chatService.createChat(newChatDto).pipe(
            switchMap((chat: ChatI)=> {
              const newTicket: ChatTicketDto = {
                chatId: chat.id,
                memberId: user.id
              }
              return this.chatService.createTicket(newTicket).pipe(
                map((ticket: ChatTicketI)=>{
                  return true;
                })
              )
            })
          )
        } else 
          throw new HttpException("Such user can not be found", HttpStatus.NOT_FOUND);
      })
    )
  }

}
