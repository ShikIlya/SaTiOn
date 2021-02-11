import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessengerComponent } from './messenger.component';
import { ChatsComponent } from './chats/chats.component';
import { ChatComponent } from './chat/chat.component';
import { MessengerRoutingModule } from './messenger-routing.module';



@NgModule({
  declarations: [MessengerComponent, ChatsComponent, ChatComponent],
  imports: [
    CommonModule,
    MessengerRoutingModule
  ]
})
export class MessengerModule { }
