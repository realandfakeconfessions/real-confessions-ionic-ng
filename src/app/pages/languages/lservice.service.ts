import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { LanguageInt } from './languageint';

@Injectable({
  providedIn: 'root'
})
export class LserviceService {

  collectionName = 'Languages';

  constructor(
    private firestore: AngularFirestore){
    }

  readLanguage(){
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  createLanguage(lang){
    return this.firestore.collection(this.collectionName).add(lang);
  }

  updateLanguage(id, lang){
    this.firestore.doc(this.collectionName + '/' + id).update(lang);
  }

  deleteLanguage(id){
    this.firestore.doc(this.collectionName + '/' + id).delete();
  }
}
