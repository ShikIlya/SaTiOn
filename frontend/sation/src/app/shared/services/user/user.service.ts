import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  /**
   * Получить авторизованного пользователя
   * @returns Пользователь типа User
   */
  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users`, { withCredentials: true });
  }

}
