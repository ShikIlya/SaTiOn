import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'messenger',
    loadChildren: () => import('./messenger/messenger.module').then(m => m.MessengerModule)
  },
  {
    path: 'authentification',
    loadChildren: () => import('./authentification/authentification.module').then(m => m.AuthentificationModule)
  },
  {
    path: '**',
    redirectTo: '/messenger'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
