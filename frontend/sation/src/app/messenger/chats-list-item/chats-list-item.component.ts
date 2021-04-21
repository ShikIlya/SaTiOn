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
  /**
   * Output для изменения активного чата
   */
  @Output() currentChatIdOnChange = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  /**
   * Замена Output активного чата
   * @param id Идентификатор чата
   */
  setChat(id: string) {
    this.currentChatIdOnChange.emit(id);
  }
}
