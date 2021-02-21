import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessengerComponent } from './messenger.component';
import { ChatsComponent } from './chats/chats.component';
import { ChatComponent } from './chat/chat.component';
import { MessengerRoutingModule } from './messenger-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [MessengerComponent, ChatsComponent, ChatComponent],
  imports: [
    CommonModule,
    MessengerRoutingModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class MessengerModule { }
