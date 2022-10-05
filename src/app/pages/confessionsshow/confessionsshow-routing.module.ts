import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfessionsshowPage } from './confessionsshow.page';

const routes: Routes = [
  {
    path: '',
    component: ConfessionsshowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfessionsshowPageRoutingModule {}
