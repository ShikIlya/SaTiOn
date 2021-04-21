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

  login(user: UserLogin) {
    return this.http.post(`${this.apiUrl}/users/login`, user, { observe: 'response', withCredentials: true });
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/users/is_auth`, { withCredentials: true });
  }

  register(user: UserRegister) {
    return this.http.post(`${this.apiUrl}/users/register`, user, { observe: 'response', withCredentials: true });
  }

  logout() {
    return this.http.get(`${this.apiUrl}/users/logout`, { withCredentials: true });
  }

}
