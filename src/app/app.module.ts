import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { LanguagesPage } from './pages/languages/languages.page';
import { ConfessionsPage } from './pages/confessions/confessions.page';
import { CategoriesPage } from './pages/categories/categories.page';
import { ConfessionsnewPage } from './pages/confessionsnew/confessionsnew.page';
import { ConfessionsshowPage } from './pages/confessionsshow/confessionsshow.page';

@NgModule({
  declarations: [
    AppComponent,
    ConfessionsshowPage,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
