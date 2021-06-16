import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DialogNewChatComponent } from '../dialog-new-chat/dialog-new-chat.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateChat } from 'src/app/shared/models/chatDto.model';
import { ChatService } from '../../services/chat/chat.service';
import { User } from 'src/app/shared/models/user.model';
import { DataStoreService } from 'src/app/shared/services/data-store/data-store.service';
import { map, takeUntil } from 'rxjs/operators';
import { Destroyer } from 'src/app/shared/destroyer';

@Component({
  selector: 'app-choose-chat',
  templateUrl: './choose-chat.component.html',
  styleUrls: ['./choose-chat.component.scss'],
})
export class ChooseChatComponent
  extends Destroyer
  implements OnInit, OnDestroy
{
  @Input() user: User;
  constructor(public dialog: MatDialog, private chatService: ChatService) {
    super();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  openDialogNewChat() {
    const dialogRef = this.dialog.open(DialogNewChatComponent, {
      restoreFocus: false,
    });
    /**
     * Подписка на получение результата из модального окна
     */
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) this.createChat(result);
      });
  }

  /**
   * Создание чата
   * @param data Название чата и логин приглашенного пользователя
   */
  createChat(data: CreateChat) {
    this.chatService.createNewChat(data, this.user);
  }
}
