import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';
import { UserService } from 'src/app/shared/services/user/user.service';

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
    private userService: UserService
  ) {
    this.initializeLoginForm();
  }

  ngOnInit(): void {}

  onSubmit() {}

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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * Вход пользователя в систему
   */
  login() {
    if (this.loginFormGroup.valid)
      this.authService
        .login(this.loginFormGroup.value)
        .subscribe((response) => {
          if (response.status === 202)
            this.userService.getUser().subscribe((res) => {
              this.router.navigate(['/messenger']);
            });
        });
  }
}
