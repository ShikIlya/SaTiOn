import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/shared/models/message.model';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
})
export class MessagesListComponent implements OnInit {
  @Input() array: Message[];

  constructor() {}

  ngOnInit(): void {}
}
