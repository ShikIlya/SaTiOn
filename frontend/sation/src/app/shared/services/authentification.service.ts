import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post(`${this.apiUrl}/users/login`, user, { observe: 'response', withCredentials: true });
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users`, { withCredentials: true });
  }

}
