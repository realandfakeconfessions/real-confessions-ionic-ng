import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfessionsshowPageRoutingModule } from './confessionsshow-routing.module';

import { ConfessionsshowPage } from './confessionsshow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfessionsshowPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ConfessionsshowPage],
  exports: [CommonModule, FormsModule]
})
export class ConfessionsshowPageModule {}
