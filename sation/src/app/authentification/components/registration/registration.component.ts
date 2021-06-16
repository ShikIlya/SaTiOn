import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { Destroyer } from 'src/app/shared/destroyer';
import { User } from 'src/app/shared/models/user.model';
import { UserRegister } from 'src/app/shared/models/userRegisterDto.model';
import { DataStoreService } from 'src/app/shared/services/data-store/data-store.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { AuthentificationService } from '../../services/authentification.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent
  extends Destroyer
  implements OnInit, OnDestroy
{
  hidePass = true;
  registrationFormGroup: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthentificationService,
    private userService: UserService,
    private dataStoreService: DataStoreService,
    private snackBar: MatSnackBar
  ) {
    super();
    this.initializeRegistrationForm();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  /**
   * Регистрация пользователя
   */
  onSubmit() {
    if (this.registrationFormGroup.valid) {
      const user: UserRegister = {
        email: String(
          this.registrationFormGroup.get('email').value
        ).toLowerCase(),
        login: String(
          this.registrationFormGroup.get('login').value
        ).toLowerCase(),
        password: String(this.registrationFormGroup.get('password').value),
      };
      this.authService
        .register(user)
        .pipe(
          takeUntil(this.destroy$),
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
  }

  /**
   * Инициализация формы регистрации
   */
  initializeRegistrationForm() {
    this.registrationFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      login: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z\\d]+[_a-zA-Z\\d]*')],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'
          ),
        ],
      ],
    });
  }

  /**
   * Получение сообщений об ошибках элементы формы
   * @param control Элемент управления формы
   * @param error Ошибка валидности элемента формы
   * @returns Сообщение об ошибки, либо ничего
   */
  getErrorMessage(control: FormControl, error: string) {
    if (control.hasError('required')) {
      return 'Обязательное поле';
    }
    if (control.hasError('email')) {
      return 'Некорректный email';
    }
    return control.hasError('pattern') ? error : '';
  }
}
