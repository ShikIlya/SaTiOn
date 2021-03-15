import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  hidePass = true;
  registrationFormGroup: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) {
    this.initializeRegistrationForm();
  }

  ngOnInit(): void {
  }
  onSubmit() {

  }

  initializeRegistrationForm() {
    this.registrationFormGroup = this.fb.group({
      "email": ["", [Validators.required, Validators.email]],
      "login": ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      "password": ["", [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$")]]
    });
  }

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
