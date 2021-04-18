import { HttpClient } from '@angular/common/http';
import { Injectable, SystemJsNgModuleLoaderConfig } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { ChatsListItem } from 'src/app/shared/models/chatsListItem.model';
import { CreateChat } from 'src/app/shared/models/createChat.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  apiUrl: string = environment.baseUrl;
  private socket: SocketIOClient.Socket;

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:8080');
  }

  sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  onNewMessage() {
    return new Observable(observer => {
      this.socket.on('message', msg => {
        observer.next(msg);
      });
    });
  }

  getUserChats(): Observable<ChatsListItem[]> {
    return this.http.get<ChatsListItem[]>(`${this.apiUrl}/chat`, { withCredentials: true });
  }

  createChat(data: CreateChat) {
    return this.http.post(`${this.apiUrl}/chat/create`, data, { withCredentials: true });
  }

}
