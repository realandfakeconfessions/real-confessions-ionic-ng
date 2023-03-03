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
  lastVisible: any;
  confessionswlimit : any = [];
  mylength1: number;

  constructor(
    private firestore: AngularFirestore
  ) { }

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

  readConfessions4(lcode: string, mylimit: number){
    const docRef = this.firestore.collection(this.collectionName, ref =>
      ref.limit(mylimit).where("clanguage", "==", lcode)).snapshotChanges();
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
          snap.forEach((doc: any) => {
            console.log("first query: ", this.mylength1);
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
              converteds2: doc.data().converteds2
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
            snap.forEach((doc: any) => {
              console.log("next query: ", mylength2);
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
                converteds2: doc.data().converteds2
              });
            });
            this.lastVisible = snap.docs[snap.docs.length-1] || null;
          }

        });
      }

      return this.confessionswlimit;
  }

  findAllobj<tipo>(path: string) {
    const docRef = this.firestore.collection<tipo>(path).valueChanges();
    return docRef;
  }

  findAllobjObservable<tipo>(path: string, lcode: string) {
    const docRef = this.firestore.collection<tipo>(path, ref => ref.where("clanguage", "==", lcode)).valueChanges();
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
