import { Component, OnInit } from '@angular/core';
import { UsersInt } from '../signin/usersint';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss'],
})
export class RolesPage implements OnInit {

  usersInt3: UsersInt;

  constructor() {
    this.usersInt3 = {} as UsersInt;
   }

  ngOnInit() {
    this.fillRoleDocument();
  }

  fillRoleDocument(){
    console.log("method fillRoleDocument(): started");
    console.log("User loged in sessionstorage roles page: ", sessionStorage.getItem("userDetails"));
    this.usersInt3 = JSON.parse(sessionStorage.getItem("userDetails")) as UsersInt;
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
