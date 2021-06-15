import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessengerComponent } from './messenger.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessengerRoutingModule } from './messenger-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DialogNewChatComponent } from './components/dialog-new-chat/dialog-new-chat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ChatsListComponent } from './components/chats-list/chats-list.component';
import { ChatsListItemComponent } from './components/chats-list-item/chats-list-item.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { MessageComponent } from './components/message/message.component';
import { MessagesListComponent } from './components/messages-list/messages-list.component';
import { ChatHeaderComponent } from './components/chat-header/chat-header.component';
import { ChatFooterComponent } from './components/chat-footer/chat-footer.component';
import { AngularResizedEventModule } from 'angular-resize-event';
import { ChooseChatComponent } from './components/choose-chat/choose-chat.component';
import { ChatsListPipe } from './pipes/chats-list.pipe';

@NgModule({
  declarations: [
    MessengerComponent,
    ChatComponent,
    SidebarComponent,
    DialogNewChatComponent,
    ChatsListComponent,
    ChatsListItemComponent,
    UserMenuComponent,
    MessageComponent,
    MessagesListComponent,
    ChatHeaderComponent,
    ChatFooterComponent,
    ChooseChatComponent,
    ChatsListPipe,
  ],
  imports: [
    CommonModule,
    MessengerRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    AngularResizedEventModule,
  ],
})
export class MessengerModule {}
