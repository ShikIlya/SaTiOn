import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessengerComponent } from './messenger.component';
import { ChatComponent } from './chat/chat.component';
import { MessengerRoutingModule } from './messenger-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DialogNewChatComponent } from './dialog-new-chat/dialog-new-chat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ChatsListComponent } from './chats-list/chats-list.component';
import { ChatsListItemComponent } from './chats-list-item/chats-list-item.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { MessageComponent } from './message/message.component';
import { MessagesListComponent } from './messages-list/messages-list.component';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { ChatFooterComponent } from './chat-footer/chat-footer.component';


@NgModule({
  declarations: [MessengerComponent, ChatComponent, SidebarComponent, DialogNewChatComponent, ChatsListComponent, ChatsListItemComponent, UserMenuComponent, MessageComponent, MessagesListComponent, ChatHeaderComponent, ChatFooterComponent],
  imports: [
    CommonModule,
    MessengerRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class MessengerModule { }
