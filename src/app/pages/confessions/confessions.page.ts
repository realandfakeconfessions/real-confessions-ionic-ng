import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { formatDate } from '@angular/common';

import { ModalController } from '@ionic/angular';

import { CserviceService } from './cservice.service';
import { ConfessionsnewPage } from '../confessionsnew/confessionsnew.page';
import { ConfessionsshowPage } from '../confessionsshow/confessionsshow.page';

import { ConfessionsInt } from './confessionsint';
import { LanguageInt } from '../languages/languageint';


@Component({
  selector: 'app-confessions',
  templateUrl: './confessions.page.html',
  styleUrls: ['./confessions.page.scss'],
})
export class ConfessionsPage implements OnInit {

  public languages: string;
  apublicVar: string = "apublicVar with default value";
  cid: string = "noID";
  public static cid2: string = "tizdOZmPV9ZzCTueE3Nv";
  public selectedlang: LanguageInt;
  public defaulseletlang: string;
  langlist: LanguageInt[] = [];
  langlist2: LanguageInt[] = [];
  conflist: ConfessionsInt[] = [];
  private colleclang = 'Languages';

  confessionsList2 = [];

  confessionsList: ConfessionsInt[] = [];
  langlistcodes: LanguageInt[] = [];
  private colleccon = 'Confessions';
  confessionsint: ConfessionsInt;

  constructor(
    private cserviceService: CserviceService,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController){
      this.confessionsint = {} as ConfessionsInt;
    }

  ngOnInit() {
    this.languages = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("somehow I need an activateroute var, So I added: ", this.languages);
    this.chooseALanguage();
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
 */
findConfbyid(rowID) {

  console.log(rowID);
  console.log("apublicVar value is without a change: ", this.apublicVar);
  this.cid = rowID;
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
  console.log("The selected confession id is: ", this.cid);

  this.openCardModal2();
}

/**
* Load allowed languages.
* The user choose a language and the confessions
* are showed in that language
*/
chooseALanguage(){
  this.cserviceService.findAllobj<LanguageInt>(this.colleclang).subscribe( res => {
         //console.log(res);
         this.langlist = res;
         console.log("my lang list length: ", this.langlist.length);
         //console.log("My lang list:", this.langlist);
         this.defaulseletlang = this.langlist[3].lcode;
         console.log("My default language is:", this.defaulseletlang);
         for(let i = 0; i < this.langlist.length; i++){
           //console.log("my language code value is: ", this.langlist[i].lcode);
           if(this.selectedlang == undefined && this.langlist[i].lcode == "en"){
             console.log("English code: ", this.langlist[i].lcode);
             var docRef = this.cserviceService.readConfessions3(this.langlist[i].lcode);
            docRef.subscribe(data => {
              this.confessionsList2 = data.map(e => {
               return {
                 id: e.payload.doc['id'],
                 isEdit: false,
                 clanguage: e.payload.doc.data()['clanguage'],
                 ctitle: e.payload.doc.data()['ctitle'],
                 cisreal: e.payload.doc.data()['cisreal'],
                 ccategory: e.payload.doc.data()['ccategory'],
                 ctext: e.payload.doc.data()['ctext'],
                 cdate: e.payload.doc.data()['cdate'],
                 curltext: e.payload.doc.data()['curltext'],
                 curlaudio: e.payload.doc.data()['curlaudio'],
                 converteds1: e.payload.doc.data()['converteds1'],
                 converteds2: e.payload.doc.data()['converteds2'],
                 };
               });
                 console.log("First thing to load is my list: ", this.confessionsList2.map(data => data));
             });
             break;
           } else if(this.langlist[i].lcode == "en" && this.selectedlang !== undefined && this.langlist[i].lcode == this.selectedlang.lcode){
             console.log("English code: ", this.langlist[i].lcode);
             var docRef = this.cserviceService.readConfessions3(this.langlist[i].lcode);
             docRef.subscribe(data => {
               this.confessionsList2 = data.map(e => {
                return {
                  id: e.payload.doc['id'],
                  isEdit: false,
                  clanguage: e.payload.doc.data()['clanguage'],
                  ctitle: e.payload.doc.data()['ctitle'],
                  cisreal: e.payload.doc.data()['cisreal'],
                  ccategory: e.payload.doc.data()['ccategory'],
                  ctext: e.payload.doc.data()['ctext'],
                  cdate: e.payload.doc.data()['cdate'],
                  curltext: e.payload.doc.data()['curltext'],
                  curlaudio: e.payload.doc.data()['curlaudio'],
                  converteds1: e.payload.doc.data()['converteds1'],
                  converteds2: e.payload.doc.data()['converteds2'],
                 };
              });
                  console.log("First thing to load is my list: ", this.confessionsList2.map(data => data));
             });
             break;
           } else if(this.langlist[i].lcode == "es" && this.selectedlang !== undefined && this.langlist[i].lcode == this.selectedlang.lcode){
             console.log("Spanish code: ", this.langlist[i].lcode);
             var docRef = this.cserviceService.readConfessions3(this.langlist[i].lcode);
             docRef.subscribe(data => {
              this.confessionsList2 = data.map(e => {
                return {
                  id: e.payload.doc['id'],
                  isEdit: false,
                  clanguage: e.payload.doc.data()['clanguage'],
                  ctitle: e.payload.doc.data()['ctitle'],
                  cisreal: e.payload.doc.data()['cisreal'],
                  ccategory: e.payload.doc.data()['ccategory'],
                  ctext: e.payload.doc.data()['ctext'],
                  cdate: e.payload.doc.data()['cdate'],
                  curltext: e.payload.doc.data()['curltext'],
                  curlaudio: e.payload.doc.data()['curlaudio'],
                  converteds1: e.payload.doc.data()['converteds1'],
                  converteds2: e.payload.doc.data()['converteds2'],
                  };
               });
                  console.log("First thing to load is my list: ", this.confessionsList2.map(data => data));
             });
             break;
           } else if(this.langlist[i].lcode == "fr" && this.selectedlang !== undefined && this.langlist[i].lcode == this.selectedlang.lcode){
             console.log("French code: ", this.langlist[i].lcode);
             var docRef = this.cserviceService.readConfessions3(this.langlist[i].lcode);
             docRef.subscribe(data => {
              this.confessionsList2 = data.map(e => {
                return {
                  id: e.payload.doc['id'],
                  isEdit: false,
                  clanguage: e.payload.doc.data()['clanguage'],
                  ctitle: e.payload.doc.data()['ctitle'],
                  cisreal: e.payload.doc.data()['cisreal'],
                  ccategory: e.payload.doc.data()['ccategory'],
                  ctext: e.payload.doc.data()['ctext'],
                  cdate: e.payload.doc.data()['cdate'],
                  curltext: e.payload.doc.data()['curltext'],
                  curlaudio: e.payload.doc.data()['curlaudio'],
                  converteds1: e.payload.doc.data()['converteds1'],
                  converteds2: e.payload.doc.data()['converteds2'],
                  };
              });
                  console.log("First thing to load is my list: ", this.confessionsList2.map(data => data));
             });
             break;
           } else if(this.langlist[i].lcode == "ja" && this.selectedlang !== undefined && this.langlist[i].lcode == this.selectedlang.lcode){
             console.log("Japanese code: ", this.langlist[i].lcode);
             var docRef = this.cserviceService.readConfessions3(this.langlist[i].lcode);
             docRef.subscribe(data => {
              this.confessionsList2 = data.map(e => {
                return {
                  id: e.payload.doc['id'],
                  isEdit: false,
                  clanguage: e.payload.doc.data()['clanguage'],
                  ctitle: e.payload.doc.data()['ctitle'],
                  cisreal: e.payload.doc.data()['cisreal'],
                  ccategory: e.payload.doc.data()['ccategory'],
                  ctext: e.payload.doc.data()['ctext'],
                  cdate: e.payload.doc.data()['cdate'],
                  curltext: e.payload.doc.data()['curltext'],
                  curlaudio: e.payload.doc.data()['curlaudio'],
                  converteds1: e.payload.doc.data()['converteds1'],
                  converteds2: e.payload.doc.data()['converteds2'],
                  };
              });
                  console.log("First thing to load is my list: ", this.confessionsList2.map(data => data));
             });
             break;
           }
         } // end for
   }); // end subscribe
}

// ngonin load my confession list
// and as the user change that list
// I need to call that main method again with the selected new list
callNgOninAgain(){
  this.chooseALanguage();
}

 /**
 * My modal function, create a confession, call confessionsnew
 */
 async openCardModal(){
   console.log("my click event for my modal is working. Open new confession");

   const modal = await this.modalCtrl.create({
     component: ConfessionsnewPage
   });

   await modal.present();

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
