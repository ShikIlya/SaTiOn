import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Chat } from 'src/app/shared/models/chat.model';
import { Message } from 'src/app/shared/models/message.model';
import { MessagesList } from 'src/app/shared/models/messagesList.model';
import { OnDeleteMessage } from 'src/app/shared/models/onDeleteMessage.model';
import { User } from 'src/app/shared/models/user.model';
import { ChatService } from '../services/chat/chat.service';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
})
export class MessagesListComponent implements OnInit, AfterViewChecked {
  @Input() messagesList: MessagesList[];
  @Input() footerHeight: number;
  @Input() currentChat: Chat;
  @Input() user: User;
  @Output() onEditMessage = new EventEmitter<Message>();
  /**
   * Блок сообщений
   */
  @ViewChild('messagesListComp') private messagesListComp: ElementRef;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.onDeleteMessage().subscribe((data: OnDeleteMessage) => {
      const messageListItem = this.messagesList.find((messageListItem) => {
        return messageListItem.messages.some((el) => el.id === data.messageId);
      });
      messageListItem.messages.splice(
        messageListItem.messages.findIndex(
          (message) => message.id === data.messageId
        ),
        1
      );
      if (messageListItem.messages.length === 0)
        this.messagesList.splice(
          this.messagesList.findIndex((el) => el.date === messageListItem.date),
          1
        );
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.messagesListComp.nativeElement.scroll({
      top: this.messagesListComp.nativeElement.scrollHeight,
      left: 0,
    });
  }

  checkDate(date: string): string {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);
    if (today.toLocaleDateString() === date) {
      return 'сегодня';
    }
    if (yesterday.toLocaleDateString() === date) {
      return 'вчера';
    }
    return date;
  }

  editMessage(message: Message) {
    this.onEditMessage.emit(message);
  }
}
