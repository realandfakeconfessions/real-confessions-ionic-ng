import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { formatDate } from '@angular/common';

import { ModalController } from '@ionic/angular';

import { CserviceService } from './cservice.service';
import { ConfessionsnewPage } from '../confessionsnew/confessionsnew.page';
import { ConfessionsshowPage } from '../confessionsshow/confessionsshow.page';

import { ConfessionsInt } from './confessionsint';


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

  confessionsList = [];
  private path = 'Confessions';
  confessionsint: ConfessionsInt;

  constructor(
    private cserviceService: CserviceService,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController){
      this.confessionsint = {} as ConfessionsInt;
    }

  ngOnInit() {
    this.languages = this.activatedRoute.snapshot.paramMap.get('id');

    // Read the confessions' list
    this.cserviceService.readConfessions().subscribe(data => {

      this.confessionsList = data.map(e => {
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
      })
      console.log("First thing to load is my list: " +this.confessionsList.map(x => x.id));
    });

  }


 /**
 * Edit a confession record
 */
  editRecord(record) {
   record.isEdit = true;
   record.Editclanguage = record.clanguage.lcode;
   record.Editctitle = record.ctitle;
   record.Editcisreal = record.cisreal;
   record.Editccategory = record.ccategory.cname;
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

  console.log("apublicVar value is without a change: ", this.apublicVar);
  this.cid = rowID;
  ConfessionsPage.cid2 = rowID;

  if (Object.keys(this.confessionsint).length === 0) {
  console.log("this.confessionsint value is empty: ", this.confessionsint);
  this.cserviceService.findConfbyid<ConfessionsInt>(this.path, rowID).subscribe( res => {
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
