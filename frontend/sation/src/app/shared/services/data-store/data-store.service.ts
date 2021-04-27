import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Chat } from '../../models/chat.model';
import { User } from '../../models/user.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  private user: BehaviorSubject<User>;
  private currentChat: BehaviorSubject<Chat>;
  constructor(private userService: UserService) {
    this.user = new BehaviorSubject(null);
    this.currentChat = new BehaviorSubject(null);
  }

  /**
   * Получить текущего пользователя в глобальном сторе
   * @returns Пользователя типа Observable<User>
   */
  getUser(): Observable<User> {
    if (this.user.value) {
      return this.user.asObservable();
    }
    else
      return this.userService.getUser().pipe(map((user) => {
        this.setUser(user);
        return user;
      }))
  }

  /**
   * Заменить пользователя в глобальном сторе
   * @param user Текущий пользователь типа User | null
   */
  setUser(user: User | null) {
    this.user.next(user);
  }

  /**
   * Получить текущий чат
   * @returns Выбранный чат типа Observable<ChatsListItem>
   */
  getCurrentChat(): Observable<Chat> {
    return this.currentChat.asObservable();
  }

  /**
   * Заменить текущий чат в глобальном сторе
   * @param user Текущий чат типа ChatsListItem | null
   */
  setCurrentChat(chat: Chat | null) {
    this.currentChat.next(chat);
  }

}
