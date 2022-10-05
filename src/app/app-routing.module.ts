import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu/confessions',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'confessionsnew',
    loadChildren: () => import('./pages/confessionsnew/confessionsnew.module').then( m => m.ConfessionsnewPageModule)
  },
  {
    path: 'confessionsshow',
    loadChildren: () => import('./pages/confessionsshow/confessionsshow.module').then( m => m.ConfessionsshowPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
