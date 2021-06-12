import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/shared/models/chat.model';
import { Message } from 'src/app/shared/models/message.model';
import { User } from 'src/app/shared/models/user.model';
import { DataStoreService } from 'src/app/shared/services/data-store/data-store.service';
import { ChatService } from '../services/chat/chat.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  @Input() currentChat: Chat;
  @Input() user: User;
  constructor(
    private dataStoreService: DataStoreService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.dataStoreService.getUser().subscribe((user) => {
      this.user = user;
    });
    this.message.creationTime = this.formatMessageTime(
      this.message.creationTime
    );
  }

  formatMessageTime(time: string): string {
    const date = new Date(time);
    return `${date.getHours()}:` + String(date.getMinutes()).padStart(2, '0');
  }

  deleteMessage() {
    this.chatService.deleteMessage(this.currentChat.id, this.message.id);
  }
}
