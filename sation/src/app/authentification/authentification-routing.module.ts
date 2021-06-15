import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Авторизация — SaTiOn' },
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    data: { title: 'Регистрация — SaTiOn' },
  },
  {
    path: '**',
    redirectTo: '/authentification/login',
  },
];

@NgModule({
  imports: [RouterModule.forChild(AUTH_ROUTES)],
  exports: [RouterModule],
})
export class AuthentificationRoutingModule {}
