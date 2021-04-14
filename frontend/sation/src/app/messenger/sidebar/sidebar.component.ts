import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';
import { DialogNewChatComponent } from '../dialog-new-chat/dialog-new-chat.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthentificationService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout().subscribe(res => {
      this.router.navigate(['/authentification/login']);
    });
  }

  openDialogNewChat() {
    const dialogRef = this.dialog.open(DialogNewChatComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        console.log(result);
    });
  }

}
