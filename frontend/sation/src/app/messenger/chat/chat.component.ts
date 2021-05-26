import { ElementRef, HostListener, Input } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Chat } from 'src/app/shared/models/chat.model';
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

    this.dataStoreService
      .getCurrentChat()
      .pipe(
        switchMap((chat: Chat | null) => {
          return chat ? this.chatService.getChatMessages(chat.id) : of(null);
        })
      )
      .subscribe((chat: Chat | any) => {
        if (chat) this.messages = chat.messages;
      });
  }

  setFooterHeight(height: number) {
    this.footerHeight = height;
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleCloseChat(event: KeyboardEvent) {
    this.dataStoreService.setCurrentChat(null);
  }
}
