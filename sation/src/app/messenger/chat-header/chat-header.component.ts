import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/shared/models/chat.model';
import { DataStoreService } from 'src/app/shared/services/data-store/data-store.service';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
})
export class ChatHeaderComponent implements OnInit {
  @Input() currentChat: Chat;
  constructor(private dataStoreService: DataStoreService) {}

  ngOnInit(): void {}

  closeChat() {
    this.dataStoreService.setCurrentChat(null);
  }
}
