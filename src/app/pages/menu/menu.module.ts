import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard} from '@angular/fire/compat/auth-guard';

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
        loadChildren: () => import('../languages/languages.module').then( m => m.LanguagesPageModule),
        canActivate: [AngularFireAuthGuard]
      },
      {
        path: 'categories',
        loadChildren: () => import('../categories/categories.module').then( m => m.CategoriesPageModule),
        canActivate: [AngularFireAuthGuard]
      },
      {
        path: 'profiles',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule),
        canActivate: [AngularFireAuthGuard]
      },
      {
        path: 'roles',
        loadChildren: () => import('../roles/roles.module').then( m => m.RolesPageModule),
        canActivate: [AngularFireAuthGuard]
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
