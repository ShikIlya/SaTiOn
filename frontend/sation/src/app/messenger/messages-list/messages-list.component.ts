import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/app/shared/models/message.model';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
})
export class MessagesListComponent implements OnInit {
  @Input() messages: Message[];
  @Input() footerHeight: number;
  /**
   * Блок сообщений
   */
  @ViewChild('messagesList') private messagesList: ElementRef;

  constructor() {}

  ngOnInit(): void {}
}
