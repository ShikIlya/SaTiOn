import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/shared/models/userRegisterDto.model';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  hidePass = true;
  registrationFormGroup: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthentificationService
  ) {
    this.initializeRegistrationForm();
  }

  ngOnInit(): void { }

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
      this.authService.register(user).subscribe((v) => {
        console.log(v);
      });
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
        [Validators.required, Validators.pattern('[a-zA-Z\\d@$!%*#?&]+')],
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
