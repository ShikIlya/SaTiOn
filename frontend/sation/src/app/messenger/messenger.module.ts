import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessengerComponent } from './messenger.component';
import { ChatComponent } from './chat/chat.component';
import { MessengerRoutingModule } from './messenger-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [MessengerComponent, ChatComponent, SidebarComponent],
  imports: [
    CommonModule,
    MessengerRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class MessengerModule { }
