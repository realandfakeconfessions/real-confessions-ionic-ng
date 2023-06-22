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
  confint: ConfessionsInt;
  lastVisible: any;
  confessionswlimit : any = [];
  mylength1: number;

  constructor(
    private firestore: AngularFirestore){
     }

  // ref => ref.orderBy('cdate', 'asc')
  // ref => ref.orderBy('cdate', 'desc')
  readConfessions(){
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  readConfessions2(){
    return this.firestore.collection(this.collectionName,
      ref => ref.limit(1000).orderBy("clanguage.lcode", "asc")).snapshotChanges();
  }

  readConfessions3(lcode: string){
    const docRef = this.firestore.collection(this.collectionName, ref => ref
      .where("clanguage", "==", lcode)
      .orderBy("cdate", "desc"))
      .snapshotChanges();
    return docRef;
  }

  /**
  * This method gives a pagination or
  * infinite scroll by language using limit,
  * the orderBy desc is working perfect, asc not yet
  */

  getRecordsLimit(lcode: string, mylimit: number){

    console.log("method started: getRecordsLimit()");

    if(this.confessionswlimit.length == 0){
      var first = this.firestore.collection(this.collectionName,
        ref => ref.where("clanguage", "==", lcode)
        .orderBy("cdate", "asc")
        .limit(mylimit));

        first.get().toPromise().then((snap) => {
          this.mylength1 = snap.docs.length;

        this.lastVisible = snap.docs[snap.docs.length-1];
        //console.log("last first", this.lastVisible);
        console.log("Docs 1st length: ", snap.docs.length);

        if(this.mylength1 > 0){
          console.log("first query: ", this.mylength1);
          snap.forEach((doc: any) => {
            //console.log(doc.id, " => ", doc.data());
            this.confessionswlimit.push({
              id: doc.id,
              clanguage: doc.data().clanguage,
              ctitle: doc.data().ctitle,
              cisreal: doc.data().cisreal,
              ccategory: doc.data().ccategory,
              ctext: doc.data().ctext,
              cdate: doc.data().cdate,
              curltext: doc.data().curltext,
              curlaudio: doc.data().curlaudio,
              converteds1: doc.data().converteds1,
              converteds2: doc.data().converteds2,
              cuid: doc.data().cuid
            });
          });
        }
      });
    }


      if(this.confessionswlimit.length > 0){

        //console.log("Lastvisible next:", this.lastVisible);

        var next = this.firestore.collection(this.collectionName, ref => ref
        .where("clanguage", "==", lcode)
        .orderBy("cdate", "asc")
        .startAfter(this.lastVisible)
        .limit(mylimit));

        next.get().toPromise().then((snap) => {
          var mylength2 = snap.docs.length;
          console.log("Docs next length: ", snap.docs.length);
          if(mylength2 > 0){
            console.log("next query: ", mylength2);
            snap.forEach((doc: any) => {
              //console.log(doc.id, " => ", doc.data());
              this.confessionswlimit.push({
                id: doc.id,
                clanguage: doc.data().clanguage,
                ctitle: doc.data().ctitle,
                cisreal: doc.data().cisreal,
                ccategory: doc.data().ccategory,
                ctext: doc.data().ctext,
                cdate: doc.data().cdate,
                curltext: doc.data().curltext,
                curlaudio: doc.data().curlaudio,
                converteds1: doc.data().converteds1,
                converteds2: doc.data().converteds2,
                cuid: doc.data().cuid
              });
            });
            this.lastVisible = snap.docs[snap.docs.length-1] || null;
          }

        });
      }

      return this.confessionswlimit;
  }

  findAllobj<tipo>(path: string){
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

  /**
  * Return a confession by id with observable
  */
  findConfbyid<tipo>(path: string, id: string) {
    const docRef = this.firestore.collection<tipo>(path).doc(id).valueChanges();
    return docRef
 }

 /**
 * Return comments from a confession with observable
 */
 findConfCommByid<tipo>(path1: string, id1: string, path2: string, id2: string){

   const docRef = this.firestore.collection<tipo>(path1).doc(id1)
   .collection<tipo>(path2).doc(id2)
   .valueChanges();

   return docRef
}

/**
* Return comments from a confession
*/
findConfCommByid2(path1: string, id1: string, path2: string){

  const docRef = this.firestore.collection(path1).doc(id1)
  .collection(path2)
  .snapshotChanges();

  return docRef
}

}
