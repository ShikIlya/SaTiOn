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

  constructor(private htpp: HttpClient) { }

  login(user: User) {
    return this.htpp.post(`${this.apiUrl}/users/login`, user);
  }

}
