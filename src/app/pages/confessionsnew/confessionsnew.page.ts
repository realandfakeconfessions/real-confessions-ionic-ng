import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { ModalController } from '@ionic/angular'
import { Router } from '@angular/router';
import { LserviceService } from '../languages/lservice.service';
import { CategoriesPage } from '../categories/categories.page';
import { CaserviceService } from '../categories/caservice.service';
import { CserviceService } from '../confessions/cservice.service';
import { LanguageInt } from '../languages/languageint';
import { ConfessionsInt } from '../confessions/confessionsint';
import { UsersInt } from '../signin/usersint';

@Component({
  selector: 'app-confessionsnew',
  templateUrl: './confessionsnew.page.html',
  styleUrls: ['./confessionsnew.page.scss'],
})
export class ConfessionsnewPage implements OnInit {

  public dateString: string;

  languageList = [];
  categoryList = [];


  public serverurl: string = "http://www.realconfessions.org/textaudio/";
  public urlfilename: string;
  public textextension: string = ".txt"
  public audioextension: string = ".wav"

  confessionsForm: FormGroup;
  confessionsForm2: FormGroup;

  userInfo: UsersInt;

  constructor(
    private modalCtrl: ModalController,
    private lserviceService: LserviceService,
    private caserviceService: CaserviceService,
    private cserviceService: CserviceService,
    public fb: FormBuilder,
    public fb2: FormBuilder,
    private router: Router,
    @Inject(LOCALE_ID) private locale: string) {
      this.dateString = formatDate(Date.now(),'dd-MM-yyyy_HH:m:s',this.locale);
      this.urlfilename = this.dateString;
      this.userInfo = {} as UsersInt;
   }

  ngOnInit() {
    // No empty fields are allowed
    this.confessionsForm = this.fb.group({
      clanguage: ['', [Validators.required]],
      ctitle: ['', [Validators.required]],
      cisreal: ['', [Validators.required]],
      ccategory: ['', [Validators.required]],
      ctext: ['', [Validators.required]],
    })

    // Read the languages' list
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

    });

    // Read the category's list
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
    this.isUserLoged();
  }

  isUserLoged(){
    console.log("User loged in confessions new: ", sessionStorage.getItem("userDetails"));
    this.userInfo = JSON.parse(sessionStorage.getItem("userDetails")) as UsersInt;
    console.log("user data in confession page is: ", this.userInfo);
  }


    /**
    * Insert a confession record
    */
    createRecord() {

      this.confessionsForm2 = this.fb2.group({
        clanguage: [this.confessionsForm.value.clanguage.lcode],
        ctitle: [this.confessionsForm.value.ctitle],
        cisreal: [this.confessionsForm.value.cisreal],
        ccategory: [this.confessionsForm.value.ccategory.cname],
        ctext: [this.confessionsForm.value.ctext],
        cdate: [this.dateString],
        curltext: [this.serverurl.concat(this.confessionsForm.value.clanguage.lcode, "-",
           this.confessionsForm.value.ccategory.cname, "-", this.urlfilename, this.textextension)],
        curlaudio: [this.serverurl.concat(this.confessionsForm.value.clanguage.lcode, "-",
           this.confessionsForm.value.ccategory.cname, "-", this.urlfilename, this.audioextension)],
        converteds1: ["false"],
        converteds2: ["false"],
        cuid: [this.userInfo.uid]
      })

      this.cserviceService.createConfessions(this.confessionsForm2.value)
        .then(resp => {
          if(resp){
            this.router.navigateByUrl('/menu/confessions');
          }
          this.confessionsForm.reset();
          this.dismissModal();
        })
        .catch(error => {
          console.log(error);
        });
        //console.log(this.confessionsForm.value);
        //console.log(this.confessionsForm2.value);
        //console.log(this.confessionsForm2.value.ctitle);
        //console.log(this.confessionsForm2.value.ctext);
   }

   /**
   * Close my modal window
   */
   dismissModal(){
     console.log("my click event for my modal is working. Close");
     this.modalCtrl.dismiss();
   }

}
