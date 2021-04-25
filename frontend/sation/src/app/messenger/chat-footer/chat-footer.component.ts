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

@Component({
  selector: 'app-chat-footer',
  templateUrl: './chat-footer.component.html',
  styleUrls: ['./chat-footer.component.scss'],
})
export class ChatFooterComponent implements OnInit {
  height: number;
  currentChat: ChatsListItem;
  @Output() chatFooterHeight = new EventEmitter<number>();
  @ViewChild('chatFooter') chatFooter: ElementRef;
  constructor(private chatService: ChatService, private dataStoreService: DataStoreService) { }

  ngOnInit(): void {
    this.dataStoreService.getCurrentChat().subscribe(chat => {
      this.currentChat = chat;
    })
  }

  /**
   * Отправка сообщения
   * @param data Сообщение
   */
  sendMessage(data: any) {
    this.chatService.sendMessage(data, this.currentChat.id);
  }

  onResize(event: ResizedEvent) {
    this.chatFooterHeight.emit(event.newHeight + 1);
  }
}
