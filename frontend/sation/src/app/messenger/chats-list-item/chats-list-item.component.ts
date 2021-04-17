import { Component, Input, OnInit } from '@angular/core';
import { ChatsListItem } from 'src/app/shared/models/chatsListItem.model';

@Component({
  selector: 'app-chats-list-item',
  templateUrl: './chats-list-item.component.html',
  styleUrls: ['./chats-list-item.component.scss'],
})
export class ChatsListItemComponent implements OnInit {
  @Input() item: ChatsListItem;

  constructor() {}

  ngOnInit(): void {}
}
