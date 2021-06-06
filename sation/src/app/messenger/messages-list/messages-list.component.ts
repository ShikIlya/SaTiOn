import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Message } from 'src/app/shared/models/message.model';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
})
export class MessagesListComponent implements OnInit, AfterViewChecked {
  @Input() messages: Message[];
  @Input() footerHeight: number;
  /**
   * Блок сообщений
   */
  @ViewChild('messagesList') private messagesList: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.messagesList.nativeElement.scroll({
      top: this.messagesList.nativeElement.scrollHeight,
      left: 0,
    });
  }
}
