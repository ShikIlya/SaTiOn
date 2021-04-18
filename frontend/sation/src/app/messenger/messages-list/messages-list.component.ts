import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/app/shared/models/message.model';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
})
export class MessagesListComponent implements OnInit, AfterViewChecked {
  @Input() messages: Message[];

  @ViewChild('messagesList') private messagesList: ElementRef;

  constructor() { }

  ngOnInit(): void {
    //this.scrollToBottom();
  }

  ngAfterViewChecked() {
    //this.scrollToBottom();
  }

  /*  scrollToBottom(): void {
     try {
       console.log(this.messagesList.nativeElement.scrollHeight);
       this.messagesList.nativeElement.scrollTop = this.messagesList.nativeElement.scrollHeight;
     } catch (err) { }
   } */

}
