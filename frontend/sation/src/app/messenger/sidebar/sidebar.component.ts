import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';
import { ChatsListItem } from 'src/app/shared/models/chatsListItem.model';
import { CreateChat } from 'src/app/shared/models/createChat.model';
import { DialogNewChatComponent } from '../dialog-new-chat/dialog-new-chat.component';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  chatsList: Observable<ChatsListItem[]>;

  constructor(
    private authService: AuthentificationService,
    private router: Router,
    public dialog: MatDialog,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.getUserChats();
  }

  logout() {
    this.authService.logout().subscribe((res) => {
      this.router.navigate(['/authentification/login']);
    });
  }

  openDialogNewChat() {
    const dialogRef = this.dialog.open(DialogNewChatComponent, { restoreFocus: false });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.createChat(result);
    });
  }

  getUserChats() {
    this.chatsList = this.chatService.getUserChats();
  }

  createChat(data: CreateChat) {
    this.chatService.createChat(data).subscribe(res => {
      this.getUserChats();
    })
  }

}
