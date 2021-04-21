import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../../shared/models/userLogin.model';
import { UserRegister } from '../../shared/models/userRegister.model';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  /**
 * Авторизация пользователя
 * @param user Email и пароль
 * @returns HTTP Status accepted
 */
  login(user: UserLogin) {
    return this.http.post(`${this.apiUrl}/users/login`, user, { observe: 'response', withCredentials: true });
  }

  /**
* Проверка авторизации пользователя
* @returns True или ошибка Unauthorized
*/
  isAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/users/is_auth`, { withCredentials: true });
  }

  /**
* Регистрация пользователя
* @param user Пользовательские данные: email, login и пароль
* @returns True или ошибка Unauthorized
*/
  register(user: UserRegister) {
    return this.http.post(`${this.apiUrl}/users/register`, user, { observe: 'response', withCredentials: true });
  }

  /**
* Выход пользователя из системы
* @returns HTTP Status 200
*/
  logout() {
    return this.http.get(`${this.apiUrl}/users/logout`, { withCredentials: true });
  }

}
