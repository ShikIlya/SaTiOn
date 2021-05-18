import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/shared/models/message.model';
import { User } from 'src/app/shared/models/user.model';
import { DataStoreService } from 'src/app/shared/services/data-store/data-store.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  user: User;
  constructor(private dataStoreService: DataStoreService) {}

  ngOnInit(): void {
    this.dataStoreService.getUser().subscribe((user) => {
      this.user = user;
    });
    this.message.creationTime = this.formatMessageTime(
      this.message.creationTime
    );
  }

  formatMessageTime(time: string): string {
    const date = new Date(time);
    return `${date.getHours()}:${date.getMinutes()}`;
  }
}
