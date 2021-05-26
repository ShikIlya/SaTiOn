import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';
import { Chat } from 'src/app/shared/models/chat.model';
import { CreateChat } from 'src/app/shared/models/chatDto.model';
import { User } from 'src/app/shared/models/user.model';
import { DataStoreService } from 'src/app/shared/services/data-store/data-store.service';
import { DialogNewChatComponent } from '../dialog-new-chat/dialog-new-chat.component';
import { ChatService } from '../services/chat/chat.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  chatsList: Chat[];
  user: User = null;

  constructor(
    private authService: AuthentificationService,
    private router: Router,
    public dialog: MatDialog,
    private chatService: ChatService,
    private dataStoreService: DataStoreService
  ) {}

  ngOnInit(): void {
    this.dataStoreService
      .getUser()
      .pipe(
        map((user) => {
          this.user = user;
          return user;
        })
      )
      .subscribe((user) => {
        this.chatService.connectToChat(user.login);
      });

    this.getUserChats();
    /**
     * Получение новых чатов в socket
     */
    this.chatService.onNewChat().subscribe((chat: Chat) => {
      if (chat.creatorId === this.user.id)
        this.dataStoreService.setCurrentChat(chat);
      this.chatsList.push(chat);
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
    /* this.chatService.createChat(data).subscribe(res => {
      const newChat = { id: res['chatId'], name: data.chatName };
      this.chatsList.push(newChat);
      this.chatService.connectToChat(newChat.id);
    }); */
    this.chatService.createNewChat(data, this.user);
  }
}
