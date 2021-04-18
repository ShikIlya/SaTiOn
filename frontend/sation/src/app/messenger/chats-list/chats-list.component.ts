import { Component, Input, OnInit } from '@angular/core';
import { ChatsListItem } from 'src/app/shared/models/chatsListItem.model';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss'],
})
export class ChatsListComponent implements OnInit {
  @Input() userChats: ChatsListItem[];
  currentChatId: string = null;

  constructor() { }

  ngOnInit(): void { }

  setCurrentChatId(id: string) {
    this.currentChatId = id;
  }

}
