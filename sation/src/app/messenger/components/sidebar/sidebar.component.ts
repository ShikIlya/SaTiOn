import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';
import { Chat } from 'src/app/shared/models/chat.model';
import { CreateChat } from 'src/app/shared/models/chatDto.model';
import { Message } from 'src/app/shared/models/message.model';
import { User } from 'src/app/shared/models/user.model';
import { DataStoreService } from 'src/app/shared/services/data-store/data-store.service';
import { DialogNewChatComponent } from '../dialog-new-chat/dialog-new-chat.component';
import { ChatService } from '../../services/chat/chat.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  chatsList: Chat[];

  @Input() currentChat: Chat;
  @Input() user: User;

  constructor(
    private authService: AuthentificationService,
    private router: Router,
    public dialog: MatDialog,
    private chatService: ChatService,
    private dataStoreService: DataStoreService
  ) {}

  ngOnInit(): void {
    this.getUserChats();
    /**
     * Получение новых чатов в socket
     */
    this.chatService.onNewChat().subscribe((chat: Chat) => {
      this.chatService.connectToChat(chat.id);
      this.chatsList.push(chat);
      if (chat.creatorId === this.user.id)
        this.dataStoreService.setCurrentChat(chat);
    });
    this.chatService.onDeleteChat().subscribe((chatId: string) => {
      console.log('delete chat: ' + chatId);
      this.chatService.disconnectFromChat(chatId);
      this.chatsList.splice(
        this.chatsList.findIndex((chat) => chat.id === chatId),
        1
      );
    });
    this.chatService.onNewMessage().subscribe((message: Message) => {
      this.chatsList.find(
        (chatListItem) => chatListItem.id === message.chatId
      ).messages[0] = message;
    });
  }

  /**
   * Выход пользователя из системы
   */
  logout() {
    this.authService.logout().subscribe((res) => {
      this.dataStoreService.setUser(null);
      this.router.navigate(['/authentification/login']);
    });
  }

  /**
   * Открытие модального окна создания нового чата
   */
  openDialogNewChat() {
    const dialogRef = this.dialog.open(DialogNewChatComponent, {
      restoreFocus: false,
    });

    /**
     * Подписка на получение результата из модального окна
     */
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.createChat(result);
    });
  }

  /**
   * Получение чатов пользователя
   */
  getUserChats() {
    this.chatService.getUserChats().subscribe((res) => {
      this.chatsList = res;
      this.chatsList.forEach((chat) => {
        this.chatService.connectToChat(chat.id);
      });
    });
  }

  /**
   * Создание чата
   * @param data Название чата и логин приглашенного пользователя
   */
  createChat(data: CreateChat) {
    this.chatService.createNewChat(data, this.user);
  }
}
