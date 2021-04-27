import { ElementRef, Input } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chat } from 'src/app/shared/models/chat.model';
import { ChatsListItem } from 'src/app/shared/models/chatsListItem.model';
import { Message } from 'src/app/shared/models/message.model';
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
  @ViewChild('messagesList') messagesList: ElementRef;
  constructor(
    private chatService: ChatService,
    private dataStoreService: DataStoreService
  ) {}

  ngOnInit(): void {
    /**
     * Получение новых сообщений в socket
     */
    this.chatService.onNewMessage().subscribe((message: Message) => {
      this.messages.push(message);
    });
    this.dataStoreService.getUser().subscribe((res) => console.log(res));
    this.dataStoreService.getCurrentChat().subscribe((chat: ChatsListItem) => {
      if (chat) {
        console.log('sdfsdf');
        this.chatService.getChatMessages(chat.id).subscribe((chat: Chat) => {
          this.messages = chat.messages;
          console.log(this.messages);
        });
      }
    });
  }

  setFooterHeight(height: number) {
    this.footerHeight = height;
  }
}
