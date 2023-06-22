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
  collectionName5 = 'SubcMessages';
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

  //get the user ip
  getUseripServ(){
    return this.http.get(this.url);
  }

  //get the user ip
  getUseripServ2(url: string){
    return this.http.get(url);
  }

  //create auto id before creating an object
  getId(){
    return this.firestore.createId();
  }

  /**
  * create a user with
  * email and password
  */
  createUser2(user){
    return this.fireauth.createUserWithEmailAndPassword(user.uemail, user.upass);
  }

  /**
  * create a user document
  * with extra information about
  * the new created user
  */
  createUser3(data: any, path: string, id: string){
    const coll = this.firestore.collection(path);
    return coll.doc(id).set(data);
  }

  //retrieve the user's profile
  readProfile(){
    return this.firestore.collection(this.collectionName2).snapshotChanges();
  }

  /**
  * retrieve the confessions that
  *the user has written along the
  * different languages that exists
  */
  readUserConfessions(userlogedid: string){
    var docRef =  this.firestore.collection(this.collectionName4, ref => ref
      .where("cuid", "==", userlogedid)
      .orderBy("cdate", "desc"))
      .snapshotChanges();
    return docRef;
  }

  //insert a profile object
  createProfile(profile){
    //console.log("created profile is: ", profile);
    return this.firestore.collection(this.collectionName2).add(profile);
  }

  readConfessionDoc(confid: string){
    const docRef = this.firestore.collection(this.collectionName4).doc(confid);
    console.log("my confession ref is: ", docRef);
    return docRef;
  }

  //insert a comment object
  createComment2(confid: string, comment){
    const docRef = this.firestore.collection(this.collectionName4).doc(confid)
    .collection(this.collectionName5).add(comment);
    return docRef;
  }

  //update a profile object
  updateProfile(id, prof){
    this.firestore.doc(this.collectionName2 + '/' + id).update(prof);
  }

  //delete a profile object
  deleteProfile(id){
    this.firestore.doc(this.collectionName2 + '/' + id).delete();
  }

  /**
  * get the information from the specific
  * user
  */
  getUserById2<tipo>(path: string, id: string) {
    const docRef = this.firestore.collection<tipo>(path).doc(id).valueChanges();
    return docRef
 }

 getDocById<tipo>(path: string, id: string) {
   const docRef = this.firestore.collection<tipo>(path).doc(id).valueChanges();
   return docRef
}

}
