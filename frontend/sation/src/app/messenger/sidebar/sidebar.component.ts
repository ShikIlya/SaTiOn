import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthentificationService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout().subscribe(res => {
      this.router.navigate(['/authentification/login']);
    });
  }

} 
