import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../services/authentification.service';
import { DataStoreService } from '../../../shared/services/data-store/data-store.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { catchError, switchMap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hidePass = true;
  loginFormGroup: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthentificationService,
    private userService: UserService,
    private dataStoreService: DataStoreService,
    private snackBar: MatSnackBar
  ) {
    this.initializeLoginForm();
  }

  ngOnInit(): void {}

  /**
   * Вход пользователя в систему
   */
  onSubmit() {
    if (this.loginFormGroup.valid)
      this.authService
        .login(this.loginFormGroup.value)
        .pipe(
          switchMap((response) => {
            if (response.status === 202) return this.userService.getUser();
          })
        )
        .subscribe(
          (user: User) => {
            this.dataStoreService.setUser(user);
            this.router.navigate(['/messenger']);
          },
          (err) => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: err.error.message,
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
            console.log(err);
          }
        );
  }

  /**
   * Перейти к регистрации
   */
  navToRegist() {
    this.router.navigate([this.router.url, 'registration']);
  }

  /**
   * Инициализация формы для авторизации
   */
  initializeLoginForm() {
    this.loginFormGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
}
