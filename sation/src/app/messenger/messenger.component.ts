import { Component, Input, OnInit } from '@angular/core';
import { Chat } from '../shared/models/chat.model';
import { User } from '../shared/models/user.model';
import { DataStoreService } from '../shared/services/data-store/data-store.service';
import { ChatService } from './services/chat/chat.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss'],
})
export class MessengerComponent implements OnInit {
  currentChat: Chat = null;
  user: User = null;
  constructor(
    private dataStoreService: DataStoreService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.dataStoreService.getCurrentChat().subscribe((chat) => {
      this.currentChat = chat;
    });
    this.dataStoreService.getUser().subscribe((user) => {
      this.user = user;
      this.chatService.connectToChat(this.user.login);
    });
  }
}
