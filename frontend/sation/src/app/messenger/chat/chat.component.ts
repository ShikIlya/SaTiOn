import { ElementRef, Input } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/app/shared/models/message.model';
import { DataStoreService } from 'src/app/shared/services/data-store/data-store.service';
import { ChatService } from '../services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messages: Message[] = [
    {
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam reiciendis eos fugit eius animi ex pariatur perferendis earum, deleniti atque consequuntur voluptatibus optioiste, dolores dolorum ipsam ad praesentium dolor!',
      time: '16:06',
      type: true,
    },
    {
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam reiciendis eos fugit eius animi ex pariatur perferendis earum, deleniti atque consequuntur voluptatibus optioiste, dolores dolorum ipsam ad praesentium dolor!',
      time: '16:06',
      type: false,
    },
    {
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam reiciendis eos fugit eius animi ex pariatur perferendis earum, deleniti atque consequuntur voluptatibus optioiste, dolores dolorum ipsam ad praesentium dolor!',
      time: '16:06',
      type: true,
    },
    {
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam reiciendis eos fugit eius animi ex pariatur perferendis earum, deleniti atque consequuntur voluptatibus optioiste, dolores dolorum ipsam ad praesentium dolor!',
      time: '16:06',
      type: true,
    },
    {
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam reiciendis eos fugit eius animi ex pariatur perferendis earum, deleniti atque consequuntur voluptatibus optioiste, dolores dolorum ipsam ad praesentium dolor!',
      time: '16:06',
      type: false,
    },
    {
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam reiciendis eos fugit eius animi ex pariatur perferendis earum, deleniti atque consequuntur voluptatibus optioiste, dolores dolorum ipsam ad praesentium dolor!',
      time: '16:06',
      type: true,
    },
    {
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam reiciendis eos fugit eius animi ex pariatur perferendis earum, deleniti atque consequuntur voluptatibus optioiste, dolores dolorum ipsam ad praesentium dolor!',
      time: '16:06',
      type: true,
    },
    {
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam reiciendis eos fugit eius animi ex pariatur perferendis earum, deleniti atque consequuntur voluptatibus optioiste, dolores dolorum ipsam ad praesentium dolor!',
      time: '16:06',
      type: false,
    },
    {
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam reiciendis eos fugit eius animi ex pariatur perferendis earum, deleniti atque consequuntur voluptatibus optioiste, dolores dolorum ipsam ad praesentium dolor!',
      time: '16:06',
      type: true,
    },
    {
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam reiciendis eos fugit eius animi ex pariatur perferendis earum, deleniti atque consequuntur voluptatibus optioiste, dolores dolorum ipsam ad praesentium dolor!',
      time: '16:06',
      type: true,
    },
    {
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam reiciendis eos fugit eius animi ex pariatur perferendis earum, deleniti atque consequuntur voluptatibus optioiste, dolores dolorum ipsam ad praesentium dolor!',
      time: '16:06',
      type: false,
    },
    {
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam reiciendis eos fugit eius animi ex pariatur perferendis earum, deleniti atque consequuntur voluptatibus optioiste, dolores dolorum ipsam ad praesentium dolor!',
      time: '16:06',
      type: true,
    },
  ];

  footerHeight: number = 0;
  @ViewChild('messagesList') messagesList: ElementRef;

  constructor(private chatService: ChatService, private dataStoreService: DataStoreService) { }

  ngOnInit(): void {
    /**
     * Получение новых сообщений в socket
     */
    this.chatService.onNewMessage().subscribe((msg) => {
      console.log('got a message: ' + msg);
    });
    this.dataStoreService.getUser().subscribe(res => console.log(res));
  }

  setFooterHeight(height: number) {
    this.footerHeight = height;
  }
}
