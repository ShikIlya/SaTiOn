/* import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let injector: TestBed;
  let authService: AuthentificationService;
  let guard: AuthGuard;
  let routeMock: any = { snapshot: {} };
  let routeStateMock: any = { snapshot: {}, url: '/cookies' };
  let routerMock = { navigate: jasmine.createSpy('navigate') }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: Router, useValue: routerMock },],
      imports: [HttpClientTestingModule]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthentificationService)
  });

  it('should redirect an unauthenticated user to the login route', () => {
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(of(false));
    expect(routerMock.navigate).toHaveBeenCalledWith(['/authentification/login']);
  });

  it('should allow the authenticated user to access app', () => {
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(of(true));
  });

  it('guard создается', () => {
    expect(guard).toBeTruthy();
  });
});
 */