import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RolesPageRoutingModule } from './roles-routing.module';

import { RolesPage } from './roles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RolesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RolesPage],
  exports: [CommonModule, FormsModule]
})
export class RolesPageModule {}
