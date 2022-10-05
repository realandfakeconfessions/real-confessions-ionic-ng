import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

import { CaserviceService } from './caservice.service';
import { CategoriesInt } from './categoriesint';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  public categories: string;

  categoryList = [];
  categoryData: CategoriesInt;
  categoryForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private caserviceService: CaserviceService,
    public fb: FormBuilder
 ) {
   this.categoryData = {} as CategoriesInt;
 }

 ngOnInit() {

   this.categories = this.activatedRoute.snapshot.paramMap.get('id');

   this.categoryForm = this.fb.group({
     cname: ['', [Validators.required]],
     cdescription: ['', [Validators.required]]
   })

   this.caserviceService.readCategory().subscribe(data => {

     this.categoryList = data.map(e => {
       return {
         id: e.payload.doc['id'],
         isEdit: false,
         cname: e.payload.doc.data()['cname'],
         cdescription: e.payload.doc.data()['cdescription'],
       };
     })

   });
 }

 createRecord() {
  this.caserviceService.createCategory(this.categoryForm.value)
    .then(resp => {
      this.categoryForm.reset();
    })
    .catch(error => {
      console.log(error);
    });
}

editRecord(record) {
  record.isEdit = true;
  record.Editcname = record.cname;
  record.Editcdescription = record.cdescription;
}

updateRecord(recordRow) {
  let record = {};
  record['cname'] = recordRow.Editcname;
  record['cdescription'] = recordRow.Editcdescription;
  this.caserviceService.updateCategory(recordRow.id, record);
  recordRow.isEdit = false;
}

removeRecord(rowID) {
  this.caserviceService.deleteCategory(rowID);
}

}
