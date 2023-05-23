import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginauthService } from '../signin/loginauth.service';
import { MessagesService } from '../messages/messages.service';
import { LoginPage } from '../login/login.page';
import { ConfessionsnewPage } from '../confessionsnew/confessionsnew.page';
import { UsersInt } from '../signin/usersint';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  varlogin: boolean = false;
  varadmin: boolean = false;
  addcbutton: boolean = false;
  userlogedrole: boolean = false;
  useralias: string;
  useradmin: string;
  usersInt1: UsersInt;
  usersInt2: UsersInt;

  pages = [
    //{
    //  title: 'Confessions Page',
    //  url: '/menu/confessions',
    //  icon: 'heart'
    //},
    {
      title: 'Languages Page',
      url: '/menu/languages',
      icon: 'warning'
    },
    {
      title: 'Categories Page',
      url: '/menu/categories',
      icon: 'book'
    },
    {
      title: 'Profiles Page',
      url: '/menu/profiles',
      icon: 'home'
    }
  ];

  constructor(
    private myloginser: LoginauthService,
    private showmess: MessagesService,
    private modalCtrl: ModalController,
    private router: Router) { //begin constructor

      this.usersInt1 = {} as UsersInt;

    } //end constructor

  ngOnInit() {
    this.loginUserState();
  }

  loginUserState(){
    this.myloginser.userState().subscribe( res => {
      if(res){
        const path = "Users";
        const myuid3 = res.uid;
        console.log("User loged in loginUserState()", myuid3);
        this.getUserInfo2(path, myuid3);
      } else {
        console.log("No User loged in yet loginUserState()");
      }
    });
  }

  getUserInfo2(path: string, id: string){
    console.log("method getUserInfo2(): started");
    //this.emptyAnInterface2();
    this.myloginser.getUserById2<UsersInt>(path, id).subscribe( res => {
      if (res) {
        this.usersInt1 = res;
        //console.log("user data is: ", this.loginData);
        this.useralias = this.usersInt1.ualias;
        this.useradmin = this.usersInt1.urolecod;
        //console.log("admin var 1 is: ", this.useradmin);
        //sessionStorage.setItem('userDetails', JSON.stringify(this.usersInt1));
        //console.log("User loged in menu page: ", sessionStorage.getItem("userDetails"));
        //this.usersInt2 = JSON.parse(sessionStorage.getItem("userDetails")) as UsersInt;
        //console.log("user data in menu page is: ", this.usersInt2);
        this.varlogin = true;
        this.varlogin = true;
        this.addcbutton = true;
        this.userlogedrole = true;
        if(this.useradmin != undefined && this.useradmin == "admin"){
          console.log("admin var is 3: ", this.useradmin);
          this.varadmin = true;
        } else {
          this.varadmin = false;
          console.log("admin var is 4: ", this.useradmin);
        }
      }
    });
  }

  refreshBrowser(){
    //I need to refresh the browser to see changes in the menu
    location.reload();
  }

  logout(){
    console.log("Method logout() started: ");
    this.myloginser.logoutserv();
    this.varlogin = false;
    this.addcbutton = false;
    this.varadmin = false;
    this.userlogedrole = false;
    this.showmess.presentToast("The user has logout successfully!");
    this.emptyAnInterface2();
    this.callConfessions();
  }

  emptyAnInterface2(){

    sessionStorage.removeItem("userDetails");
    sessionStorage.clear();
    this.usersInt2 = {uid: "", uemail: "", upass: "", ualias: "", ucountry: "", uregpip: "", uregdate: "", urolecod: ""};
    this.usersInt1 = {uid: "", uemail: "", upass: "", ualias: "", ucountry: "", uregpip: "", uregdate: "", urolecod: ""};

  }

  callConfessions(){
    console.log("Method callConfessions() started: ");
    this.router.navigateByUrl('/menu/confessions');
  }

  callUserRole(){
    if(this.userlogedrole){
      console.log("Method callUserRole() started: ");
      this.router.navigateByUrl('/menu/roles');
    } else {
      console.log("User has logged out");
      this.router.navigateByUrl('/menu/confessions');
    }
  }

  /**
  * My modal function, open login page in another page, call login
  */
  async openCardModalLogin(){
    console.log("my click event for my modal is working (open a html page from another one). Open login");

    const modal = await this.modalCtrl.create({
      component: LoginPage
    });

    await modal.present();
  }

  /**
  * My modal function, create a confession, call confessionsnew
  */
  async openCardModalCNew(){
    console.log("my click event for my modal is working. Open new confession");

    const modal = await this.modalCtrl.create({
      component: ConfessionsnewPage
    });

    await modal.present();

  }

}
