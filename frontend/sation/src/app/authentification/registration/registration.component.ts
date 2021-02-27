import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  hide = true;
  constructor(private router: Router, private location: Location) { }

  ngOnInit(): void {
  }
  onSubmit() {

  }
  goBack() {
    this.location.back();
  }
}
