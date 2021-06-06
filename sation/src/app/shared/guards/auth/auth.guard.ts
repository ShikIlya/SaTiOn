import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthentificationService } from '../../../authentification/services/authentification.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthentificationService, private router: Router) { }

  /**
   * Проверка возможности перехода на маршрут "Мессенджер"
   * @returns True или false
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(map((response) => {
      /* this.router.navigate(['/messenger']); */
      return response;
    }), catchError((error) => {
      this.router.navigate(['/authentification/login']);
      return of(false);
    }));
  }

}
