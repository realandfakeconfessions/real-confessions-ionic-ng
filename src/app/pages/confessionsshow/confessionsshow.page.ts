import { Component, OnInit, Injectable, Inject, LOCALE_ID  } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { formatDate } from '@angular/common';

import { CommentsPage } from '../comments/comments.page';

import { LoginauthService } from '../signin/loginauth.service';

import { ConfessionsPage } from '../confessions/confessions.page';

import { CserviceService } from '../confessions/cservice.service';

import { ConfessionsInt } from '../confessions/confessionsint';

import { CommentsInt } from '../comments/commentsint';

import { UsersInt } from '../signin/usersint';

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
  ccommentsForm: FormGroup;
  ccommentsForm2: FormGroup;
  userInfo4: UsersInt;
  private path = 'Confessions';
  private path2 = 'SubcMessages';
  commentsList = [];
  public dateString: string;
  public cucomment: string = "FOfXegZoU5MlGkdvPjJ5QZhk0sj1";

  constructor(
    private cserviceService: CserviceService,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private myloginser: LoginauthService,
    public fb: FormBuilder,
    public fb2: FormBuilder,
    private router: Router,
    @Inject(LOCALE_ID) private locale: string) {
      this.dateString = formatDate(Date.now(),'dd-MM-yyyy_HH:m:s',this.locale);
      this.userInfo4 = {} as UsersInt;
  }

  ngOnInit() {
    this.callShowFromConfessionsClass2();
    this.noEmptyFields();
    this.loginUserState4();
  }

  noEmptyFields(){
    this.ccommentsForm = this.fb.group({
      ccomment: ['', [Validators.required]]
    });
  }

  callShowFromConfessionsClass2(){

    console.log("Method callShowFromConfessionsClass2(): started");

    this.rowId = ConfessionsPage.cid2;

    if(this.rowId != "" && this.rowId != undefined){

      console.log("rowId", this.rowId);
      this.cserviceService.findConfbyid<ConfessionsInt>(this.path, ConfessionsPage.cid2).subscribe( res => {
             this.confessionsint = res;
             console.log("this.confessionsint is from confessionsshow: ", this.confessionsint);
      });
    } else {
      console.log("rowId not found", this.rowId);
    }

  }

  /**
  * Find all the comments that a confession has
  * not perfect yet
  **/
  findConfComments(){

    console.log("Method findConfComments(): started");

    this.cserviceService.findConfCommByid2(this.path, ConfessionsPage.cid2, this.path2).subscribe( res => {
           console.log("get comments from one confession on confessionsshow: ", res);

           this.commentsList = res.map(e => {
             return {
               id: e.payload.doc['id'],
               ccdate: e.payload.doc.data()['ccdate'],
               ccomment: e.payload.doc.data()['ccomment'],
               ccuserid: e.payload.doc.data()['ccuserid'],
             };
           })
           console.log("My comments list: ", this.commentsList.map(myv => myv));
    });

  }

  /**
  * Add or insert a comment to a confession
  * just for parent or root confession
  * not other comments yet
  **/
  replyAcomment2(){

    console.log("entering method replyAcomment2()");

    this.ccommentsForm2 = this.fb2.group({
      ccomment: [this.ccommentsForm.value.ccomment],
      ccuserid: [this.cucomment],
      ccdate: [this.dateString],
    });

    this.myloginser.createComment2(ConfessionsPage.cid2, this.ccommentsForm2.value)
    .then(res => {
      if(res){
        //this.router.navigateByUrl('/menu/confessions');
        console.log("my comment response is: ", res);
      }
      this.ccommentsForm.reset();
    })
    .catch(error => {
      console.log(error);
    });
  }

  /**
  * Check if there is a loged user
  * or not
  **/
  loginUserState4(){
    this.myloginser.userState().subscribe( res => {
      if(res){

        const path = "Users";
        const myuid4 = res.uid;

        if(myuid4 != null || myuid4 != ""){
          console.log("User loged in confessions show page: ", myuid4);
          this.getUserInfo4(path, myuid4);
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
  getUserInfo4(path: string, id: string){
    console.log("method getUserInfo4(): started");
    this.myloginser.getUserById2<UsersInt>(path, id).subscribe( res => {
      if (res) {
        this.userInfo4 = res;
        this.cucomment = this.userInfo4.uid;
        console.log("user info from cshow: ", this.userInfo4);
      }
    });
  }

  /**
  * My modal function, open confession in another page, call confessionsshow
  */
  async openCardModalComm(){
    console.log("my click event for my modal is working (open a html page from another one). Open Comments");

    const modal = await this.modalCtrl.create({
      component: CommentsPage
    });

    await modal.present();
  }


  /**
  * Close my modal window, confession detail
  */
  dismissModal2(){
    console.log("my click event for my modal is working. Close confession detail");
    this.modalCtrl.dismiss();
  }


}
