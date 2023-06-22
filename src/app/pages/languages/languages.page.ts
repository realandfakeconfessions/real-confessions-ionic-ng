import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { LserviceService } from './lservice.service';
import { LanguageInt } from './languageint';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.page.html',
  styleUrls: ['./languages.page.scss'],
})
export class LanguagesPage implements OnInit {

  languageList = [];
  languageData: LanguageInt;
  languageForm: FormGroup;

  constructor(
   private lserviceService: LserviceService,
   public fb: FormBuilder) {
     this.languageData = {} as LanguageInt;
   }

 ngOnInit() {

   this.languageForm = this.fb.group({
     lcode: ['', [Validators.required]],
     lname: ['', [Validators.required]],
     lcountry: ['', [Validators.required]]
   });
   this.loadLangList();
 }

 loadLangList(){

   this.lserviceService.readLanguage().subscribe(data => {

     this.languageList = data.map(e => {
       return {
         id: e.payload.doc['id'],
         isEdit: false,
         lcode: e.payload.doc.data()['lcode'],
         lname: e.payload.doc.data()['lname'],
         lcountry: e.payload.doc.data()['lcountry'],
       };
     })
     console.log("My lang list: ", this.languageList.map(myv => myv));
   });
 }

 createRecord() {
  this.lserviceService.createLanguage(this.languageForm.value)
    .then(resp => {
      this.languageForm.reset();
    })
    .catch(error => {
      console.log(error);
    });
}

editRecord(record) {
  record.isEdit = true;
  record.Editlcode = record.lcode;
  record.Editlname = record.lname;
  record.Editlcountry = record.lcountry;
}

updateRecord(recordRow) {
  let record = {};
  record['lcode'] = recordRow.Editlcode;
  record['lname'] = recordRow.Editlname;
  record['lcountry'] = recordRow.Editlcountry;
  this.lserviceService.updateLanguage(recordRow.id, record);
  recordRow.isEdit = false;
}

removeRecord(rowID) {
  this.lserviceService.deleteLanguage(rowID);
}

}
