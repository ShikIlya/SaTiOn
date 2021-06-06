import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chat } from 'src/app/shared/models/chat.model';

@Component({
  selector: 'app-chats-list-item',
  templateUrl: './chats-list-item.component.html',
  styleUrls: ['./chats-list-item.component.scss'],
})
export class ChatsListItemComponent implements OnInit {
  @Input() chatListItem: Chat;
  @Input() selected: boolean;
  @Output() selectedChatId = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void { }

  /**
   * Замена Output активного чата
   * @param id Идентификатор чата
   */
  setChat(chatId: string) {
    if (!this.selected)
      this.selectedChatId.emit(chatId);
  }
}
