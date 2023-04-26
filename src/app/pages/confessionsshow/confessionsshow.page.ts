import { Component, OnInit, Injectable } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { ActivatedRoute } from '@angular/router';

import { ConfessionsPage } from '../confessions/confessions.page';

import { CserviceService } from '../confessions/cservice.service';

import { ConfessionsInt } from '../confessions/confessionsint';

@Component({
  selector: 'app-confessionsshow',
  templateUrl: './confessionsshow.page.html',
  styleUrls: ['./confessionsshow.page.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class ConfessionsshowPage implements OnInit {

  rowId = "tizdOZmPV9ZzCTueE3Nv";
  confessionsint: ConfessionsInt;
  private path = 'Confessions';
  //confessionsList = [];
  confessionsList: ConfessionsInt[] = [];


  constructor(
    private cserviceService: CserviceService,
    private route: ActivatedRoute,
    private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.callShowFromConfessionsClass2();
  }

  callShowFromConfessionsClass2(){
    this.rowId = ConfessionsPage.cid2;
    console.log("rowId", this.rowId);
    this.cserviceService.findConfbyid<ConfessionsInt>(this.path, ConfessionsPage.cid2).subscribe( res => {
           this.confessionsint = res;
           console.log("this.confessionsint is from confessionsshow: ", this.confessionsint);
    });
  }


  /**
  * Close my modal window, confession detail
  */
  dismissModal2(){
    console.log("my click event for my modal is working. Close confession detail");
    this.modalCtrl.dismiss();
  }


}
