import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/app/shared/models/message.model';
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

  @ViewChild('messagesList') messagesList: ElementRef;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.onNewMessage().subscribe((msg) => {
      console.log('got a message: ' + msg);
    });
  }
}
