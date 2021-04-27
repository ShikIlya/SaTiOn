import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { Chat } from 'src/app/shared/models/chat.model';
import { CreateChat } from 'src/app/shared/models/chatDto.model';
import { MessageDto } from 'src/app/shared/models/messageDto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  apiUrl: string = environment.baseUrl;
  private socket: SocketIOClient.Socket;

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:8080');
  }

  /**
   * Подключение к чату
   * @param id String id чата
   */
  connectToChat(id: string) {
    this.socket.emit('joinRoom', id);
  }

  onConnectToChat() {
    return new Observable((observer) => {
      this.socket.on('joinedRoom', (chatId) => {
        observer.next(chatId);
      });
    });
  }

  /**
   * Отправка сообщения
   * @param message MessageDto
   */
  sendMessage(message: MessageDto) {
    this.socket.emit('msgToServer', message);
  }

  /**
   * Событие создания нового сообщения
   * @returns Сообщение
   */
  onNewMessage() {
    return new Observable((observer) => {
      this.socket.on('msgToClient', (msg) => {
        observer.next(msg);
      });
    });
  }

  /**
   * Получение чатов пользователя
   * @returns Список чатов пользователя
   */
  getUserChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.apiUrl}/chat`, {
      withCredentials: true,
    });
  }

  /**
   * Создание чата
   * @param data Имя чата и приглашенный логин пользователя
   */
  createChat(data: CreateChat) {
    return this.http.post(`${this.apiUrl}/chat/create`, data, {
      withCredentials: true,
    });
  }

  getChatMessages(id: string): Observable<Chat> {
    return this.http.get<Chat>(`${this.apiUrl}/chat/messages`, {
      params: { id: id },
      withCredentials: true,
    });
  }
}
