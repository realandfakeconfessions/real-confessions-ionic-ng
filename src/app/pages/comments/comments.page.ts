import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CserviceService } from '../confessions/cservice.service';
import { ConfessionsPage } from '../confessions/confessions.page';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  commentsList2 = [];
  private path = 'Confessions';
  private path2 = 'SubcMessages';

  constructor(private modalCtrl: ModalController,
    private cserviceService: CserviceService) { }

  ngOnInit() {
    this.findConfComments2();
  }

  /**
  * Find all the comments that a confession has
  * not perfect yet
  **/
  findConfComments2(){

    console.log("Method findConfComments2(): started");

    this.cserviceService.findConfCommByid2(this.path, ConfessionsPage.cid2, this.path2).subscribe( res => {
           console.log("get comments from one confession on comments: ", res);

           this.commentsList2 = res.map(e => {
             return {
               id: e.payload.doc['id'],
               ccdate: e.payload.doc.data()['ccdate'],
               ccomment: e.payload.doc.data()['ccomment'],
               ccuserid: e.payload.doc.data()['ccuserid'],
             };
           })
           console.log("My comments list: ", this.commentsList2.map(myv => myv));
    });

  }

  /**
  * Close my modal window, confession detail
  */
  dismissModalComm(){
    console.log("my click event for my modal is working. Close confession detail");
    this.modalCtrl.dismiss();
  }

}
