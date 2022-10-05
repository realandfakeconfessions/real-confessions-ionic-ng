import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfessionsnewPageRoutingModule } from './confessionsnew-routing.module';

import { ConfessionsnewPage } from './confessionsnew.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfessionsnewPageRoutingModule
  ],
  declarations: [ConfessionsnewPage]
})
export class ConfessionsnewPageModule {}
