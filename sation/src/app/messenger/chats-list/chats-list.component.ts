import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Chat } from 'src/app/shared/models/chat.model';
import { DataStoreService } from 'src/app/shared/services/data-store/data-store.service';
import { ChatService } from '../services/chat/chat.service';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss'],
})
export class ChatsListComponent implements OnInit {
  chatMenuPosition = { x: '0', y: '0' };
  chatMenuIsOpened = false;
  chatMenuFirstOpen = true;
  chatMenuClickedOutside = false;
  selectedChatId = '';
  /**
   * Список чатов пользователя
   */
  @Input() userChats: Chat[];
  @Input() currentChat: Chat;

  @ViewChild(MatMenuTrigger, { static: true }) matMenuTrigger: MatMenuTrigger;
  @ViewChild('chatMenuWrapper') chatMenu: ElementRef;
  @ViewChild('chatsList') chatsList: ElementRef;

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
    this.chatService.onLeftRoom().subscribe((chatId) => {
      console.log('disconnected from chat: ' + chatId);
    });
    this.matMenuTrigger.menuClosed.subscribe((v) => {
      if (!this.chatMenuClickedOutside) {
        this.chatMenuIsOpened = true;
        this.matMenuTrigger.openMenu();
      }
    });
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: any) {
    if (!this.chatMenu.nativeElement.contains(event.target)) {
      this.closeChatMenu();
    }
  }

  clickInsideList(event: any) {
    this.chatMenuClickedOutside = false;
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

  openChatMenu(event: any) {
    if (this.selectedChatId !== event.chatId)
      this.selectedChatId = event.chatId;
    this.chatMenuPosition.x = event.x + 'px';
    this.chatMenuPosition.y = event.y + 'px';

    if (this.chatMenuIsOpened) {
      this.chatMenuIsOpened = false;
      this.matMenuTrigger.closeMenu();
    }
    if (this.chatMenuFirstOpen) {
      this.chatMenuIsOpened = true;
      this.chatMenuFirstOpen = false;
      this.matMenuTrigger.openMenu();
    }
  }

  closeChatMenu() {
    this.chatMenuIsOpened = false;
    this.chatMenuClickedOutside = true;
    this.chatMenuFirstOpen = true;
    this.matMenuTrigger.closeMenu();
  }

  manageChat() {
    this.closeChatMenu();
    console.log('manage');
  }

  deleteChat() {
    console.log(this.selectedChatId);
    this.closeChatMenu();
    this.chatService.deleteChat(this.selectedChatId);
  }
}
