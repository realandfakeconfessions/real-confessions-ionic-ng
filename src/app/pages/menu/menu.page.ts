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
  userid: string;
  useradmin: string;
  userprofile: string = "admin";
  usersInt: UsersInt;
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

      this.usersInt = {} as UsersInt;

    } //end constructor

  ngOnInit() {
    this.loginUserState();
  }

  loginUserState(){
    this.myloginser.userState().subscribe( res => {
      if(res){
        console.log("User loged in", res);

        const path = "Users";
        this.userid = res.uid;
        if(this.userid != null || this.userid != ""){
          this.getUserInfo3(path, this.userid);
        }

        console.log("User loged in sessionstorage menu page: ", sessionStorage.getItem("userDetails"));
        this.usersInt2 = JSON.parse(sessionStorage.getItem("userDetails")) as UsersInt;
        console.log("User details not undefined: ", this.usersInt2);
        //console.log("User ualias not undefined: ", this.usersInt2.ualias);
        //this.userid = res.uid;
        console.log("User loged in id is: ", this.userid);
        this.varlogin = true;
        this.addcbutton = true;
        this.userlogedrole = true;
        if(this.usersInt2.urolecod == "admin"){
          this.varadmin = true;
        } else {
          this.varadmin = false;
        }
      } else {
        console.log("User loged out");
        this.varlogin = false;
        this.varadmin = false;
        this.userlogedrole = false;
        this.emptyAnInterface2();
      }
    });
  }

  refreshBrowserOnce(){
    // a refresh action simulation for the browser
    location.reload();
  }

  getUserInfo3(path: string, id: string){

    this.myloginser.getUserById2<UsersInt>(path, id).subscribe( res => {
      if (res) {
        this.usersInt1 = res;
        this.useradmin = this.usersInt1.urolecod;
        sessionStorage.setItem('userDetails', JSON.stringify(this.usersInt1));
        console.log("User loged in sessionstorage 1: ", sessionStorage.getItem("userDetails"));
        this.usersInt2 = JSON.parse(sessionStorage.getItem("userDetails")) as UsersInt;
        console.log("user data is: ", this.usersInt2);
      }
    });
  }

  getMyUserById(uid: string) {
    const path = "Users";
    const id = uid;
    this.myloginser.getUserById2<UsersInt>(path, id).subscribe( res => {
      console.log("user data -> ", res);
      if (res) {
        //this.userprofile = res.urolecod;
        this.usersInt = res;
      }
    });
   }

  logout(){
    console.log("Method logout() started: ");
    this.myloginser.logoutserv();
    this.emptyAnInterface2();
    this.varlogin = false;
    this.addcbutton = false;
    this.varadmin = false;
    this.userlogedrole = false;
    this.showmess.presentToast("The user has logout successfully!");
    this.router.navigateByUrl('/menu/confessions');
  }

  emptyAnInterface2(){
    this.usersInt2 = {uid: "", uemail: "", upass: "", ualias: "", ucountry: "", uregpip: "", uregdate: "", urolecod: ""};
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
