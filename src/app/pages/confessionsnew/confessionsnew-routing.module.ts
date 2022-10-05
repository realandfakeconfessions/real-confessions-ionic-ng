import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfessionsnewPage } from './confessionsnew.page';

const routes: Routes = [
  {
    path: '',
    component: ConfessionsnewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfessionsnewPageRoutingModule {}
