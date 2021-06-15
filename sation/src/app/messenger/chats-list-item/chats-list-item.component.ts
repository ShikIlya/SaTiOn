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
  @Output() openChatMenu = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  /**
   * Замена Output активного чата
   * @param id Идентификатор чата
   */
  setChat(chatId: string) {
    if (!this.selected) this.selectedChatId.emit(chatId);
  }

  onRightClick(event: MouseEvent, chatId: string) {
    event.preventDefault();
    this.openChatMenu.emit({
      x: event.clientX,
      y: event.clientY,
      chatId: chatId,
    });
  }

  getLastMessageUser() {
    return this.chatListItem.messages.length > 0
      ? this.chatListItem.messages[0]?.user + ': '
      : '';
  }

  getLastMessage(): string {
    return this.chatListItem.messages.length > 0
      ? this.chatListItem.messages[0]?.content
      : '';
  }

  formatDate(): string {
    if (this.chatListItem.messages.length > 0) {
      const date = new Date(this.chatListItem.messages[0].creationTime);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      today.setHours(0, 0, 0, 0);
      yesterday.setHours(0, 0, 0, 0);
      if (yesterday.toLocaleDateString() === date.toLocaleDateString()) {
        return 'вчера';
      } else {
        if (today.toLocaleDateString() !== date.toLocaleDateString()) {
          return date.toLocaleDateString();
        }
      }
      return `${date.getHours()}:` + String(date.getMinutes()).padStart(2, '0');
    }
    return '';
  }
}
