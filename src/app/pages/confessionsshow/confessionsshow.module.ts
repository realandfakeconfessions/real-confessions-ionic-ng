import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfessionsshowPageRoutingModule } from './confessionsshow-routing.module';

import { ConfessionsshowPage } from './confessionsshow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfessionsshowPageRoutingModule
  ],
  declarations: [ConfessionsshowPage]
})
export class ConfessionsshowPageModule {}
