import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CaserviceService {

  collectionName = 'Categories';

  constructor(
    private firestore: AngularFirestore
  ) { }

  readCategory(){
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  createCategory(category){
    console.log(category);
    return this.firestore.collection(this.collectionName).add(category);
  }

  updateCategory(id, category){
    this.firestore.doc(this.collectionName + '/' + id).update(category);
  }

  deleteCategory(id){
    this.firestore.doc(this.collectionName + '/' + id).delete();
  }
}
