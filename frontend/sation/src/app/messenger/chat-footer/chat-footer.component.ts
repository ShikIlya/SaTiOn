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

@Component({
  selector: 'app-chat-footer',
  templateUrl: './chat-footer.component.html',
  styleUrls: ['./chat-footer.component.scss'],
})
export class ChatFooterComponent implements OnInit {
  height: number;
  @Output() chatFooterHeight = new EventEmitter<number>();
  @ViewChild('chatFooter') chatFooter: ElementRef;
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {}

  /**
   * Отправка сообщения
   * @param data Сообщение
   */
  sendMessage(data: any) {
    this.chatService.sendMessage(data);
    console.log(this.chatService.sendMessage(data));
  }

  onResize(event: ResizedEvent) {
    this.chatFooterHeight.emit(event.newHeight + 1);
  }
}
