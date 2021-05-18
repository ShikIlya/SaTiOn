import { Component, Input, OnInit } from '@angular/core';
import { Chat } from '../shared/models/chat.model';
import { DataStoreService } from '../shared/services/data-store/data-store.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss'],
})
export class MessengerComponent implements OnInit {
  currentChat: Chat = null;
  constructor(private dataStoreService: DataStoreService) {}

  ngOnInit(): void {
    this.dataStoreService
      .getCurrentChat()
      .subscribe((chat) => (this.currentChat = chat));
  }
}
