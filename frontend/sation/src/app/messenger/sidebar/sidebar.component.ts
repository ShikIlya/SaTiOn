import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';
import { ChatsListItem } from 'src/app/shared/models/chatsListItem.model';
import { DialogNewChatComponent } from '../dialog-new-chat/dialog-new-chat.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  listArray: ChatsListItem[] = [
    {
      name: 'Vasia',
      lastMessage: 'Привет',
      lastMessageTime: '19:30',
      active: false,
    },
    {
      name: 'Petya',
      lastMessage: 'Пока',
      lastMessageTime: '19:21',
      active: true,
    },
    {
      name: '3 курс',
      lastMessage: 'ыивоамраповипшриваприваршип апвпьавлптвалдт  тапот',
      lastMessageTime: '19:34',
      active: false,
    },
  ];

  constructor(
    private authService: AuthentificationService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout().subscribe((res) => {
      this.router.navigate(['/authentification/login']);
    });
  }

  openDialogNewChat() {
    const dialogRef = this.dialog.open(DialogNewChatComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) console.log(result);
    });
  }
}
