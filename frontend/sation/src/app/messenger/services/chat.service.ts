import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: any;

  constructor() { 
    this.socket = io('http://localhost:8080');
  }

  sendMessage(message: string) {
    this.socket.emit('message',  message);
  }

  onNewMessage() {
    return new Observable(observer => {
      this.socket.on('message', msg => {
        observer.next(msg);
      });
    });
  }
}
