import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthentificationService, private router: Router) { }

  /**
 * Проверка возможности перехода на маршрут "Авторизация"
 * @returns True или false
 */
  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(map((response) => {
      if (response) {
        this.router.navigate(['/messenger']);
        return false;
      }
    }), catchError((error) => {
      return of(true);
    }));
  }
}
