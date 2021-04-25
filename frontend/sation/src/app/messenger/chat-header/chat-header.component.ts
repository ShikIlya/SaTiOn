import { Component, OnInit } from '@angular/core';
import { ChatsListItem } from 'src/app/shared/models/chatsListItem.model';
import { DataStoreService } from 'src/app/shared/services/data-store/data-store.service';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss']
})
export class ChatHeaderComponent implements OnInit {
  currentChat: ChatsListItem = null;
  constructor(private dataStoreService: DataStoreService) { }

  ngOnInit(): void {
    this.dataStoreService.getCurrentChat().subscribe(chat => {
      this.currentChat = chat;
    })
  }

}
