import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ChatService } from '../services/chat/chat.service';
import { ResizedEvent } from 'angular-resize-event';
import { DataStoreService } from 'src/app/shared/services/data-store/data-store.service';
import { ChatsListItem } from 'src/app/shared/models/chatsListItem.model';
import { User } from 'src/app/shared/models/user.model';
import { MessageDto } from 'src/app/shared/models/messageDto.model';

@Component({
  selector: 'app-chat-footer',
  templateUrl: './chat-footer.component.html',
  styleUrls: ['./chat-footer.component.scss'],
})
export class ChatFooterComponent implements OnInit {
  height: number;
  currentChat: ChatsListItem;
  user: User;
  @Output() chatFooterHeight = new EventEmitter<number>();
  @ViewChild('chatFooter') chatFooter: ElementRef;
  constructor(
    private chatService: ChatService,
    private dataStoreService: DataStoreService
  ) {}

  ngOnInit(): void {
    this.dataStoreService.getCurrentChat().subscribe((chat) => {
      this.currentChat = chat;
    });
    this.dataStoreService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  /**
   * Отправка сообщения
   * @param data Сообщение
   */
  sendMessage(content: string) {
    const message: MessageDto = {
      content: content,
      chatId: this.currentChat.id,
      senderId: this.user.id,
    };
    this.chatService.sendMessage(message);
  }

  onResize(event: ResizedEvent) {
    this.chatFooterHeight.emit(event.newHeight + 1);
  }
}
