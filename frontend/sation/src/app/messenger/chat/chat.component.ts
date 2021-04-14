import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @ViewChild('messagesList') messagesList: ElementRef;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.onNewMessage().subscribe(msg => {
      console.log('got a message: ' + msg);
    });
  }

  sendMessage(data: any){
    this.chatService.sendMessage(data);
  }

}
