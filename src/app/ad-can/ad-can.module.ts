import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdCanPageRoutingModule } from './ad-can-routing.module';

import { AdCanPage } from './ad-can.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdCanPageRoutingModule
  ],
  declarations: [AdCanPage]
})
export class AdCanPageModule {}
