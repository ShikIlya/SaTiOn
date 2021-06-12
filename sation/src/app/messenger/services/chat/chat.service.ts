import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as io from 'socket.io-client';
import { Chat } from 'src/app/shared/models/chat.model';
import { CreateChat } from 'src/app/shared/models/chatDto.model';
import { MessageDto } from 'src/app/shared/models/messageDto.model';
import { User } from 'src/app/shared/models/user.model';
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

  disconnectFromChat(id: string) {
    this.socket.emit('leaveRoom', id);
  }

  onConnectToChat() {
    return new Observable((observer) => {
      this.socket.on('joinedRoom', (chatId) => {
        observer.next(chatId);
      });
    });
  }

  onLeftRoom() {
    return new Observable((observer) => {
      this.socket.on('leftRoom', (chatId) => {
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
    return this.http
      .get<Chat[]>(`${this.apiUrl}/chat`, {
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
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
    return this.http
      .get<Chat>(`${this.apiUrl}/chat/messages`, {
        params: { id: id },
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Создать чат
   * @param message MessageDto
   */
  createNewChat(data: CreateChat, hostUser: User) {
    const chatData = { chatInfo: data, user: hostUser };
    this.socket.emit('JoinChat', chatData);
  }

  /**
   * Событие создания нового чата
   * @returns Чат
   */
  onNewChat() {
    return new Observable((observer) => {
      this.socket.on('JoinedChat', (chat) => {
        observer.next(chat);
      });
    });
  }

  deleteChat(chatId) {
    this.socket.emit('DeleteChat', { chatId: chatId });
  }

  onDeleteChat() {
    return new Observable((observer) => {
      this.socket.on('ChatDeleted', (chatId) => {
        observer.next(chatId);
      });
    });
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
