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

  /**
* Отправка сообщения
* @param message String
*/
  sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  /**
* Событие создания нового сообщения
* @returns Сообщение
*/
  onNewMessage() {
    return new Observable(observer => {
      this.socket.on('message', msg => {
        observer.next(msg);
      });
    });
  }

  /**
* Получение чатов пользователя
* @returns Список чатов пользователя
*/
  getUserChats(): Observable<ChatsListItem[]> {
    return this.http.get<ChatsListItem[]>(`${this.apiUrl}/chat`, { withCredentials: true });
  }

  /**
* Создание чата
* @param data Имя чата и приглашенный логин пользователя
* @returns Список чатов пользователя
*/
  createChat(data: CreateChat) {
    return this.http.post(`${this.apiUrl}/chat/create`, data, { withCredentials: true });
  }

}
