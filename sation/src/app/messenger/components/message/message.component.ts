import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Destroyer } from 'src/app/shared/destroyer';
import { Chat } from 'src/app/shared/models/chat.model';
import { Message } from 'src/app/shared/models/message.model';
import { User } from 'src/app/shared/models/user.model';
import { DataStoreService } from 'src/app/shared/services/data-store/data-store.service';
import { ChatService } from '../../services/chat/chat.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent extends Destroyer implements OnInit, OnDestroy {
  @Input() message: Message;
  @Input() currentChat: Chat;
  @Input() user: User;
  @Output() onEditMessage = new EventEmitter<Message>();
  constructor(
    private dataStoreService: DataStoreService,
    private chatService: ChatService
  ) {
    super();
  }

  ngOnInit(): void {
    this.dataStoreService
      .getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.user = user;
      });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  formatMessageTime(time: string): string {
    const date = new Date(time);
    return `${date.getHours()}:` + String(date.getMinutes()).padStart(2, '0');
  }

  deleteMessage() {
    this.chatService.deleteMessage(this.currentChat.id, this.message.id);
  }

  editMessage() {
    this.onEditMessage.emit(this.message);
  }
}
