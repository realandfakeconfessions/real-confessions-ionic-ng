import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfessionsPageRoutingModule } from './confessions-routing.module';

import { ConfessionsPage } from './confessions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfessionsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ConfessionsPage],
  exports: [CommonModule, FormsModule],
  providers: [ConfessionsPage]
})
export class ConfessionsPageModule {}
