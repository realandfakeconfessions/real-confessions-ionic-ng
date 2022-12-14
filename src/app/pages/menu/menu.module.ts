import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'confessions',
        loadChildren: () => import('../confessions/confessions.module').then( m => m.ConfessionsPageModule)
      },
      {
        path: 'languages',
        loadChildren: () => import('../languages/languages.module').then( m => m.LanguagesPageModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('../categories/categories.module').then( m => m.CategoriesPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
