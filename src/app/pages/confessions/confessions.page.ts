import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { formatDate } from '@angular/common';

import { ModalController } from '@ionic/angular';

import { CserviceService } from './cservice.service';
import { ConfessionsshowPage } from '../confessionsshow/confessionsshow.page';
import { LoginPage } from '../login/login.page';
import { LoginauthService } from '../signin/loginauth.service';

import { ConfessionsInt } from './confessionsint';
import { LanguageInt } from '../languages/languageint';
import { UsersInt } from '../signin/usersint';

interface InfiniteScrollCustomEvent extends CustomEvent {
target: HTMLIonInfiniteScrollElement;
}


@Component({
  selector: 'app-confessions',
  templateUrl: './confessions.page.html',
  styleUrls: ['./confessions.page.scss'],
})
export class ConfessionsPage implements OnInit {

  mylimit: number = 3;
  apublicVar: string = "apublicVar with default value";
  logeduid: string;
  confessuid: string;
  public static cid2: string = "tizdOZmPV9ZzCTueE3Nv";
  varucedit: boolean = false;
  public selectedlang: LanguageInt;
  public selectedlang2: LanguageInt;
  langlist: LanguageInt[] = [];
  private colleclang = 'Languages';

  confessionswlimit: any = [];

  private colleccon = 'Confessions';
  confessionsint: ConfessionsInt;
  userInfo2: UsersInt;
  userInfo3: UsersInt;
  confessionsint2: any;

  constructor(
    private cserviceService: CserviceService,
    private activatedRoute: ActivatedRoute,
    private myloginser: LoginauthService,
    private modalCtrl: ModalController){
      this.confessionsint = {} as ConfessionsInt;
      this.userInfo2 = {} as UsersInt;
    }

  ngOnInit() {

    if(this.selectedlang == undefined || this.selectedlang2 == undefined){
      console.log("Selected language is undefined: ", this.selectedlang);
      console.log("Selected language2 is undefined: ", this.selectedlang2);
      console.log("My list is undefined or zero: ", this.confessionswlimit);
      this.selectedlang = {lcode: "en", lname: "English", lcountry: "United States"};
      this.selectedlang2 = this.selectedlang;
    }
    this.callNgOninAgain();
    this.loginUserState3();
  }

 /**
 * Edit a confession record
 */
  editRecord(record) {
   record.isEdit = true;
   record.Editclanguage = record.clanguage;
   record.Editctitle = record.ctitle;
   record.Editcisreal = record.cisreal;
   record.Editccategory = record.ccategory;
   record.Editctext = record.ctext;
   record.Editcdate = record.cdate;
   record.Editcurltext = record.curltext;
   record.Editcurlaudio = record.curlaudio;
   record.Editconverteds1 = record.converteds1;
   record.Editconverteds2 = record.converteds2;
   record.Editcuid = record.cuid;
   console.log("Show the selected record: " +record.ctitle);
 }

 updateRecord(recordRow) {
   let record = {};
   record['clanguage'] = recordRow.Editclanguage;
   record['ctitle'] = recordRow.Editctitle;
   record['cisreal'] = recordRow.Editcisreal;
   record['ccategory'] = recordRow.Editccategory;
   record['ctext'] = recordRow.Editctext;
   record['cdate'] = recordRow.Editcdate;
   record['curltext'] = recordRow.Editcurltext;
   record['curlaudio'] = recordRow.Editcurlaudio;
   record['converteds1'] = recordRow.Editconverteds1;
   record['converteds2'] = recordRow.Editconverteds2;
   record['cuid'] = recordRow.Editcuid;
   this.cserviceService.updateConfessions(recordRow.id, record);
   recordRow.isEdit = false;
 }

 /**
 * Delete a confession record
 */
 removeRecord(rowID) {
   this.cserviceService.deleteConfessions(rowID);
   console.log("Delete a confession by id: " +rowID);
 }

 /**
 * Find a confession record by id
 * and show it on a modal
 */
findConfbyid(rowID) {

  console.log(rowID);
  console.log("apublicVar value is without a change: ", this.apublicVar);
  ConfessionsPage.cid2 = rowID;

  if (Object.keys(this.confessionsint).length === 0) {
  console.log("this.confessionsint value is empty: ", this.confessionsint);
  this.cserviceService.findConfbyid<ConfessionsInt>(this.colleccon, rowID).subscribe( res => {
         this.confessionsint = res;
         console.log("this.confessionint is: ", this.confessionsint);
  });
  this.apublicVar = "apublicVar has changed with new value";
} else {
  console.log("this.confessionsint value is NOT empty; ", this.confessionsint);
}
  console.log(this.confessionsint);
  console.log("apublicVar value is with changes: ", this.apublicVar);

  this.openCardModal2();
}


/**
* Load allowed languages.
* The user chooses a language and the confessions
* are showed in that language
*/
chooseALanguage(){
  this.cserviceService.findAllobj<LanguageInt>(this.colleclang).subscribe( res => {
         //console.log(res);
         this.langlist = res;
         console.log("my lang list length: ", this.langlist.length);
         //console.log("My lang list:", this.langlist);
         for(let i = 0; i < this.langlist.length; i++){
           var mylength: number;
           //console.log("my language code value is: ", this.langlist[i].lcode);
           if(this.langlist[i].lcode == this.selectedlang.lcode
             && this.langlist[i].lcode == "en"
             && this.selectedlang.lcode == "en"
             && this.selectedlang.lcode == this.selectedlang2.lcode
             && this.selectedlang2.lcode == "en"){
               console.log("Array length at beginning en: ", this.confessionswlimit.length);
               console.log("English code selected: ", this.selectedlang);
               if(this.confessionsint2 != undefined && this.confessionsint2.clanguage != "en" && this.confessionswlimit.length == 0){
                 console.log("English code selected changed: ", this.confessionsint2.clanguage);
                 this.confessionswlimit.length = 0;
               }
               this.confessionswlimit = this.cserviceService.getRecordsLimit(this.selectedlang.lcode, this.mylimit);
               console.log("First thing to load is my list: en", this.confessionswlimit);
               console.log("Array length at ending en: ", this.confessionswlimit.length);
               break;
           } else if(this.langlist[i].lcode == this.selectedlang.lcode
             && this.langlist[i].lcode == "es"
             && this.selectedlang.lcode == "es"
             && this.selectedlang.lcode == this.selectedlang2.lcode
             && this.selectedlang2.lcode == "es"){
               console.log("Array length at beginning es: ", this.confessionswlimit.length);
               console.log("Spanish code selected: ", this.selectedlang);
               if(this.confessionsint2.clanguage != "es" && this.confessionswlimit.length == 0){
                 console.log("Spanish code selected changed: ", this.confessionsint2.clanguage);
                 this.confessionswlimit.length = 0;
               }
               this.confessionswlimit = this.cserviceService.getRecordsLimit(this.selectedlang.lcode, this.mylimit);
               console.log("First thing to load is my list: es", this.confessionswlimit);
               console.log("Array length at ending es: ", this.confessionswlimit.length);
               break;
           } else if(this.langlist[i].lcode == this.selectedlang.lcode
             && this.langlist[i].lcode == "fr"
             && this.selectedlang.lcode == "fr"
             && this.selectedlang.lcode == this.selectedlang2.lcode
             && this.selectedlang2.lcode == "fr"){
               console.log("Array length at beginning fr: ", this.confessionswlimit.length);
               console.log("French code selected: ", this.selectedlang.lcode);
               if(this.confessionsint2.clanguage != "fr" && this.confessionswlimit.length == 0){
                 console.log("French code selected changed: ", this.confessionsint2.clanguage);
                 this.confessionswlimit.length = 0;
               }
               this.confessionswlimit = this.cserviceService.getRecordsLimit(this.selectedlang.lcode, this.mylimit);
               console.log("First thing to load is my list: fr", this.confessionswlimit);
               console.log("Array length at ending fr: ", this.confessionswlimit.length);
               break;
           } else if(this.langlist[i].lcode == this.selectedlang.lcode
             && this.langlist[i].lcode == "ja"
             && this.selectedlang.lcode == "ja"
             && this.selectedlang.lcode == this.selectedlang2.lcode
             && this.selectedlang2.lcode == "ja"){
               console.log("Array length at beginning ja: ", this.confessionswlimit.length);
               console.log("Japanese code selected: ", this.selectedlang.lcode);
               if(this.confessionsint2.clanguage != "ja" && this.confessionswlimit.length == 0){
                 console.log("Japanese code selected changed: ", this.confessionsint2.clanguage);
                 this.confessionswlimit.length = 0;
               }
               this.confessionswlimit = this.cserviceService.getRecordsLimit(this.selectedlang.lcode, this.mylimit);
               console.log("First thing to load is my list: ja", this.confessionswlimit);
               console.log("Array length at ending ja: ", this.confessionswlimit.length);
                 break;
           }
         } // end for
   }); // end subscribe
}

// call ionic infinite scroll
onIonInfinite(ev) {
  console.log("Method onIonInfinite(ev): started");
  if(this.selectedlang != undefined && this.selectedlang2 != undefined
    && this.selectedlang.lcode != this.selectedlang2.lcode){
    console.log("Selectedlang has changed: 2", this.selectedlang);
    console.log("Selectedlang2 has changed: 2", this.selectedlang2);
    this.selectedlang2 = this.selectedlang;
    console.log("My list length is: ", this.confessionswlimit.length);
    this.confessionswlimit.length = 0;
  }
  this.chooseALanguage();
  setTimeout(() => {
    (ev as InfiniteScrollCustomEvent).target.complete();
  }, 500);
}

// ngonin loads my confession list
// and as the user change that list
// I need to call that main method again with the selected new list
callNgOninAgain(){
  console.log("Method callNgOninAgain(): started");
  if(this.confessionswlimit.length > 0){
    this.confessionsint2 = this.confessionswlimit[this.confessionswlimit.length - 1];
    console.log("Last row is: ", this.confessionsint2);
  }
  if(this.selectedlang != undefined && this.selectedlang2 != undefined
    && this.selectedlang.lcode != this.selectedlang2.lcode){
    console.log("Selectedlang has changed: 1", this.selectedlang);
    console.log("Selectedlang2 has changed: 1", this.selectedlang2);
    this.selectedlang2 = this.selectedlang;
    console.log("My list length is: ", this.confessionswlimit.length);
    this.confessionswlimit.length = 0
  }
  this.chooseALanguage();
}


/**
* Check if there is a loged user
* or not
**/
loginUserState3(){
  this.myloginser.userState().subscribe( res => {
    if(res){

      const path = "Users";
      const myuid3 = res.uid;

      if(myuid3 != null || myuid3 != ""){
        console.log("User loged id confessions page: ", myuid3);
        this.getUserInfo3(path, myuid3);
      }
    } else {
      console.log("No user is loged");
    }
  });
}

/**
* If there is a loged user
* then find his information
**/
getUserInfo3(path: string, id: string){
  console.log("method getUserInfo3(): started");
  this.myloginser.getUserById2<UsersInt>(path, id).subscribe( res => {
    if (res) {
      this.userInfo2 = res;
      //sessionStorage.setItem('userDetails', JSON.stringify(this.userInfo2));
      //console.log("User loged in confessions page: ", sessionStorage.getItem("userDetails"));
      //this.userInfo3 = JSON.parse(sessionStorage.getItem("userDetails")) as UsersInt;
      //console.log("user data is in confessions page: ", this.userInfo3);
      if(this.userInfo2.urolecod == "admin"){
        console.log("only admin can edit and delete for now: ", this.userInfo2.urolecod);
        this.varucedit = true;
      }
    }
  });
}

 /**
 * My modal function, open confession in another page, call confessionsshow
 */
 async openCardModal2(){
   console.log("my click event for my modal is working (open a html page from another one). Open confession");

   const modal = await this.modalCtrl.create({
     component: ConfessionsshowPage
   });

   await modal.present();
 }

}
