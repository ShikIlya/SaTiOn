import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Destroyer } from '../shared/destroyer';
import { Chat } from '../shared/models/chat.model';
import { User } from '../shared/models/user.model';
import { DataStoreService } from '../shared/services/data-store/data-store.service';
import { ChatService } from './services/chat/chat.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss'],
})
export class MessengerComponent extends Destroyer implements OnInit, OnDestroy {
  currentChat: Chat = null;
  user: User = null;
  constructor(
    private dataStoreService: DataStoreService,
    private chatService: ChatService
  ) {
    super();
  }

  ngOnInit(): void {
    this.dataStoreService
      .getCurrentChat()
      .pipe(takeUntil(this.destroy$))
      .subscribe((chat) => {
        this.currentChat = chat;
      });
    this.dataStoreService
      .getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) {
          this.user = user;
          this.chatService.connectToChat(this.user.login);
        }
      });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
