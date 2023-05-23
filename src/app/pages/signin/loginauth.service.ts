import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { HttpClient  } from '@angular/common/http';
import { UsersInt } from '../signin/usersint';

@Injectable({
  providedIn: 'root'
})
export class LoginauthService {

  collectionName = 'Users';
  collectionName2 = 'Profiles';
  collectionName3 = 'Countries';
  collectionName4 = 'Confessions';
  myuserloged: any;
  myuserloged2: UsersInt;

  url: string = "https://www.infobyip.com/";

  constructor(private firestore: AngularFirestore,
    private http: HttpClient,
    private router: Router,
    private fireauth: AngularFireAuth) {
      this.myuserloged2 = {} as UsersInt;
    }

  /**
  * login user service
  */
  loginserv(email: string, pass: string) {
    console.log("Method loginserv() started: ");
    return this.fireauth.signInWithEmailAndPassword(email, pass);
  }

  /**
  * logout user service
  */
  logoutserv() {
    console.log("Method logoutserv() started: ");
    this.fireauth.signOut();
  }

  /**
  * check if the user is loged in or out
  */
  userState() {
    console.log("Method logoutserv() started: ");
    return this.fireauth.authState;
  }

  getUseripServ(){
    return this.http.get(this.url);
  }

  getUseripServ2(url: string){
    return this.http.get(url);
  }

  createUser(user){
    console.log("created user is: ", user);
    return this.firestore.collection(this.collectionName).add(user);
  }

  createUser2(user){
    return this.fireauth.createUserWithEmailAndPassword(user.uemail, user.upass);
  }

  getId(){
    return this.firestore.createId();
  }

  createUser3(data: any, path: string, id: string){
    const coll = this.firestore.collection(path);
    return coll.doc(id).set(data);
  }

  readProfile(){
    return this.firestore.collection(this.collectionName2).snapshotChanges();
  }

  readUserConfessions(userlogedid: string){
    var docRef =  this.firestore.collection(this.collectionName4, ref => ref
      .where("cuid", "==", userlogedid)
      .orderBy("cdate", "desc"))
      .snapshotChanges();
    return docRef;
  }

  createProfile(profile){
    console.log("created profile is: ", profile);
    return this.firestore.collection(this.collectionName2).add(profile);
  }

  updateProfile(id, prof){
    this.firestore.doc(this.collectionName2 + '/' + id).update(prof);
  }

  deleteProfile(id){
    this.firestore.doc(this.collectionName2 + '/' + id).delete();
  }

  getUserById<tipo>(path: string, id: string) {
    return this.firestore.collection(path).doc<tipo>(id).valueChanges();
  }

  getUserById2<tipo>(path: string, id: string) {
    const docRef = this.firestore.collection<tipo>(path).doc(id).valueChanges();
    return docRef
 }

 getDocById<tipo>(path: string, id: string) {
   const docRef = this.firestore.collection<tipo>(path).doc(id).valueChanges();
   return docRef
}

 readCountry(){
   return this.firestore.collection(this.collectionName3).snapshotChanges();
 }

 findDocuById(id){

   const coll = "Users";

   var docRef = this.firestore.collection(coll).doc(id);

   docRef.get().toPromise().then((doc) => {
       if (doc.exists) {
           //console.log("Document data:", doc.data());
           this.myuserloged = doc.data();
           this.myuserloged2 = this.myuserloged;
           console.log("This.myuserloged2 is: ", this.myuserloged2);
       } else {
           // doc.data() will be undefined in this case
           console.log("No such document!");
       }
   }).catch((error) => {
       console.log("Error getting document:", error);
   });

   return this.myuserloged2;

 }

}
