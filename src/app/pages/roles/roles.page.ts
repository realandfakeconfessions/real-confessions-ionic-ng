import { Component, OnInit } from '@angular/core';
import { UsersInt } from '../signin/usersint';
import { ConfessionsInt } from '../confessions/confessionsint';
import { LoginauthService } from '../signin/loginauth.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss'],
})
export class RolesPage implements OnInit {

  usersInt3: UsersInt;
  confessionslst = [];
  confessionsInt: ConfessionsInt;
  userlogedid: string;

  constructor(private myloginser: LoginauthService) {
    this.usersInt3 = {} as UsersInt;
    this.confessionsInt = {} as ConfessionsInt;
   }

  ngOnInit() {
    this.fillRoleDocument();
  }

  fillRoleDocument(){
    console.log("method fillRoleDocument(): started");

      this.myloginser.userState().subscribe( res => {
        if(res){
          const path = "Users";
          const myuid4 = res.uid;
          if(myuid4 != null || myuid4 != ""){
            console.log("User loged id roles page: ", myuid4);
            this.getUserInfo4(path, myuid4);
          }
        } else {
          console.log("No User loged in yet fillRoleDocument()");
        }
      });
  }

  getUserInfo4(path: string, id: string){
    console.log("method getUserInfo4(): started");
    this.myloginser.getUserById2<UsersInt>(path, id).subscribe( res => {
      if (res) {
        this.usersInt3 = res;
        sessionStorage.setItem('userDetails', JSON.stringify(this.usersInt3));
        console.log("User loged in sessionstorage roles page: ", sessionStorage.getItem("userDetails"));
        this.usersInt3 = JSON.parse(sessionStorage.getItem("userDetails")) as UsersInt;
        this.userlogedid = this.usersInt3.uid;
        this.getUserLogedConf();
      }
    });
  }

  getUserLogedConf(){
    console.log("method getUserLogedConf(): started");
    console.log("User loged id is: ", this.userlogedid);

    this.myloginser.readUserConfessions(this.userlogedid).subscribe(data => {

      this.confessionslst = data.map(e => {
        return {
          id: e.payload.doc['id'],
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
          cuid: e.payload.doc.data()['cuid']
        };
      })
      console.log("My confession list: ", this.confessionslst.map(myv => myv));
    });
  }

  //refresh browser working
  refreshBrowserOnce(){
    if(this.usersInt3.uemail != "" && this.usersInt3.upass != ""){
      console.log("The usersInt3 has something and I will refresh page: ", this.usersInt3);
      // a refresh action simulation for the browser
      location.reload();
    }
  }

  //refresh browser working
  callhtmlelement(){
    let mybtn = document.getElementById('myrefreshbtn');
    document.getElementById('myrefreshbtn')!.click();
    console.log("myrefeshbutton has: ", mybtn);
  }


}
