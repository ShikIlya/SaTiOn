import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth/auth.guard';
import { LoginGuard } from './shared/guards/login/login.guard';

const APP_ROUTES: Routes = [
  {
    path: 'messenger',
    loadChildren: () =>
      import('./messenger/messenger.module').then(m => m.MessengerModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'authentification',
    loadChildren: () =>
      import('./authentification/authentification.module').then(
        m => m.AuthentificationModule
      ),
    canActivate: [LoginGuard]
  },
  {
    path: '**',
    redirectTo: '/messenger',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
