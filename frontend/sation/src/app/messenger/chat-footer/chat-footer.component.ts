import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat/chat.service';

@Component({
  selector: 'app-chat-footer',
  templateUrl: './chat-footer.component.html',
  styleUrls: ['./chat-footer.component.scss'],
})
export class ChatFooterComponent implements OnInit {
  constructor(private chatService: ChatService) { }

  ngOnInit(): void { }

  sendMessage(data: any) {
    this.chatService.sendMessage(data);
  }
}
