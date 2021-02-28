import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/shared/services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePass = true;
  loginFormGroup: FormGroup;


  constructor(private router: Router, private fb: FormBuilder, private authService: AuthentificationService) {
    this.initializeLoginForm();
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }

  navToRegist() {
    this.router.navigate([this.router.url, 'registration']);
  }

  initializeLoginForm() {
    this.loginFormGroup = this.fb.group({
      "email": ["", [Validators.required, Validators.email]],
      "password": ["", [Validators.required]],
    });
  }

  login() {
    if (this.loginFormGroup.valid)
      this.authService.login(this.loginFormGroup.value).subscribe(response => {
        console.log(response.status);
        if (response.status === 202)
          this.authService.getUser().subscribe(user => console.log(user));
      });
  }

}
