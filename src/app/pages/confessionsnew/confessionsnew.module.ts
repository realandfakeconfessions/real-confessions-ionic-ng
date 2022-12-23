import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfessionsnewPageRoutingModule } from './confessionsnew-routing.module';

import { ConfessionsnewPage } from './confessionsnew.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfessionsnewPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ConfessionsnewPage],
  exports: [CommonModule, FormsModule]
})
export class ConfessionsnewPageModule {}
