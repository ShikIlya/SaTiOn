import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatsListItem } from 'src/app/shared/models/chatsListItem.model';

@Component({
  selector: 'app-chats-list-item',
  templateUrl: './chats-list-item.component.html',
  styleUrls: ['./chats-list-item.component.scss'],
})
export class ChatsListItemComponent implements OnInit {
  @Input() chatListItem: ChatsListItem;
  @Input() currentChatId: string;
  @Output() currentChatIdOnChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { }

  setChat(id: string) {
    this.currentChatIdOnChange.emit(id);
  }

}
