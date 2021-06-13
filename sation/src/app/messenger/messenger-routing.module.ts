import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessengerComponent } from './messenger.component';

const MESSENGER_ROUTES: Routes = [
  {
    path: '',
    component: MessengerComponent,
    data: { title: 'Мессенджер SaTiOn' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(MESSENGER_ROUTES)],
  exports: [RouterModule],
})
export class MessengerRoutingModule {}
