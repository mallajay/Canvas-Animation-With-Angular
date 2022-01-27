import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdCanPage } from './ad-can.page';

const routes: Routes = [
  {
    path: '',
    component: AdCanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdCanPageRoutingModule {}
