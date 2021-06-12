import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/shared/models/chat.model';
import { DataStoreService } from 'src/app/shared/services/data-store/data-store.service';
import { ChatService } from '../services/chat/chat.service';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss'],
})
export class ChatsListComponent implements OnInit {
  /**
   * Список чатов пользователя
   */
  @Input() userChats: Chat[];
  @Input() currentChat: Chat;

  constructor(
    private chatService: ChatService,
    private dataStoreService: DataStoreService
  ) {}

  ngOnInit(): void {
    /**
     * Подключение пользователя к чатам
     */
    this.chatService.onConnectToChat().subscribe((chatId) => {
      console.log('connected to chat: ' + chatId);
    });
  }

  /**
   * Заменить текущий чат
   * @param id Id чата
   */
  setSelectedChat(id: string) {
    this.dataStoreService.setCurrentChat(
      this.userChats.find((chat) => chat.id === id)
    );
  }
}
