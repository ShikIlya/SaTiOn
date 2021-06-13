import { ElementRef, HostListener, Input } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Chat } from 'src/app/shared/models/chat.model';
import { Message } from 'src/app/shared/models/message.model';
import { MessagesList } from 'src/app/shared/models/messagesList.model';
import { User } from 'src/app/shared/models/user.model';
import { DataStoreService } from 'src/app/shared/services/data-store/data-store.service';
import { ChatService } from '../services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  footerHeight: number = 0;
  messagesList: MessagesList[];

  @Input() currentChat: Chat;
  @Input() user: User;

  constructor(
    private chatService: ChatService,
    private dataStoreService: DataStoreService
  ) {}

  ngOnInit(): void {
    /**
     * Получение новых сообщений в socket
     */
    this.chatService.onNewMessage().subscribe((message: Message) => {
      console.log(
        'new message:' + message.content + ' to chat: ' + message.chatId
      );
      if (this.currentChat)
        if (message.chatId === this.currentChat.id) {
          const date = new Date(message.creationTime).toLocaleDateString();
          const messageListItem = this.messagesList.find(
            (el) => el.date === date
          );
          if (messageListItem) messageListItem.messages.push(message);
          else this.messagesList.push({ date: date, messages: [message] });
        }
    });

    this.dataStoreService
      .getCurrentChat()
      .pipe(
        switchMap((chat: Chat | null) => {
          return chat ? this.chatService.getChatMessages(chat.id) : of(null);
        })
      )
      .subscribe((chat: Chat | any) => {
        if (chat) this.messagesList = this.formatMessagesByDate(chat.messages);
      });
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleCloseChat(event: KeyboardEvent) {
    this.dataStoreService.setCurrentChat(null);
  }

  setFooterHeight(height: number) {
    this.footerHeight = height;
  }

  formatMessagesByDate(messages: Message[]): MessagesList[] {
    this.messages = this.messages.sort((a, b) => {
      return (
        new Date(a.creationTime).getTime() - new Date(b.creationTime).getTime()
      );
    });
    const temp: MessagesList[] = [];
    messages.forEach((message) => {
      if (
        !temp.some(
          (el) =>
            el.date === new Date(message.creationTime).toLocaleDateString()
        )
      ) {
        const date = new Date(message.creationTime).toLocaleDateString();
        const obj = { date: date, messages: [] };
        temp.push(obj);
      }
    });
    for (const element of temp) {
      element.messages.push(
        ...messages.filter(
          (message) =>
            element.date === new Date(message.creationTime).toLocaleDateString()
        )
      );
    }
    return temp;
  }
}
