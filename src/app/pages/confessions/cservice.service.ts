import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ConfessionsInt } from './confessionsint';

@Injectable({
  providedIn: 'root'
})
export class CserviceService {

  collectionName = 'Confessions';
  public objtoStr: string = "Default empty by me";
  confint: ConfessionsInt;

  constructor(
    private firestore: AngularFirestore
  ) { }

  // ref => ref.orderBy('cdate', 'asc')
  // ref => ref.orderBy('cdate', 'desc')
  readConfessions(){
    return this.firestore.collection(this.collectionName,
      ref => ref.limit(1000).orderBy("clanguage.lcode", "asc")).snapshotChanges();
  }

  findConf<tipo>(path: string) {
    const docRef = this.firestore.collection<tipo>(path).valueChanges();
    return docRef;
  }

  createConfessions(confess){
    console.log(confess);
    return this.firestore.collection(this.collectionName).add(confess);
  }

  updateConfessions(id, confess){
    this.firestore.doc(this.collectionName + '/' + id).update(confess);
  }

  deleteConfessions(id){
    this.firestore.doc(this.collectionName + '/' + id).delete();
  }

  findConfessionbyId(id){
    //this.firestore.collection(this.collectionName).snapshotChanges(id);
    var docRef = this.firestore.collection(this.collectionName).doc(id);

    docRef.get().toPromise().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

  }

  /**
  * Return a confession by id with observable
  */
  findConfbyid<tipo>(path: string, id: string) {
    const docRef = this.firestore.collection<tipo>(path).doc(id).valueChanges();
    return docRef
 }

}
