import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninPage } from '../signin/signin.page';
import { LoginauthService } from '../signin/loginauth.service';
import { UsersInt } from '../signin/usersint';
import { MessagesService } from '../messages/messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginData: UsersInt;
  loginData2: UsersInt;
  loginForm!: FormGroup;
  myuserloged2: any;
  public static userAlias: string = "I set it undefined";

  constructor(
    private modalCtrl: ModalController,
    private myloginser: LoginauthService,
    private showmess: MessagesService,
    private router: Router,
    public fb: FormBuilder) {
    this.loginData = {} as UsersInt;
   }

  ngOnInit() {
    this.loginForm = this.fb.group({
      uemail: ['', [Validators.required]],
      upass: ['', [Validators.required]]
    });

    if(this.loginData == undefined || this.loginData == null
      || this.loginForm.value.uemail == "" || this.loginForm.value.upass == ""){
      this.getUserInfo();
    }
  }

  /**
  * login user
  */
  login() {
    console.log("Method login() started: ");
    this.emptyAnInterface();
    this.myloginser.loginserv(this.loginForm.value.uemail, this.loginForm.value.upass)
      .then(resp => {
        if(resp){
          console.log("login response: ", resp);
          const path = "Users";
          const myuid = resp.user.uid;

          if(myuid != null || myuid != ""){
            this.getUserInfo2(path, myuid);
          }

          this.showmess.presentToast("The user was found!");
          this.router.navigateByUrl('/menu/confessions');
          this.dismissModal2();
        }
        this.loginForm.reset();
      })
      .catch(error => {
        console.log(error);
        this.showmess.presentToast("The user or password is wrong!");
      });
  }

  emptyAnInterface(){
    this.loginData = {uid: "", uemail: "", upass: "", ualias: "", ucountry: "", uregpip: "", uregdate: "", urolecod: ""};
    this.loginData2 = {uid: "", uemail: "", upass: "", ualias: "", ucountry: "", uregpip: "", uregdate: "", urolecod: ""};
  }

  findDocById(id: string){
    //const id = "AEf2sFPYtCdrZnmVwZNCKabLcFB3"
    console.log("Method findDocById() started: ", id);
    //this.myuserloged2 = this.myloginser.findDocuById(id);
  }

  findDocById2(){
    const id = "AEf2sFPYtCdrZnmVwZNCKabLcFB3"
    console.log("Method findDocById() started: ", id);
    this.loginData2 = this.myloginser.findDocuById(id);
    console.log("user data is: ", this.loginData2);
  }


  loginUserState2(){
    this.myloginser.userState().subscribe( res => {
      if(res){
        console.log("User loged in from login.page, check userState", res);
      }
    });
  }

  getUserInfo(){
    const path = "Users";
    const myuid = "AEf2sFPYtCdrZnmVwZNCKabLcFB3";
    this.myloginser.getUserById2<UsersInt>(path, myuid).subscribe( res => {
      if (res) {
        this.loginData = res;
        console.log("user data in default user is: ", this.loginData);
        sessionStorage.setItem('userDetails', JSON.stringify(this.loginData));
        console.log("User loged in sessionstorage 1: ", sessionStorage.getItem("userDetails"));
        this.loginData2 = JSON.parse(sessionStorage.getItem("userDetails")) as UsersInt;
      }
    });
  }

  getUserInfo2(path: string, id: string){
    console.log("method getUserInfo2(): started");
    this.myloginser.getUserById2<UsersInt>(path, id).subscribe( res => {
      if (res) {
        this.loginData = res;
        //console.log("user data is: ", this.loginData);
        sessionStorage.setItem('userDetails', JSON.stringify(this.loginData));
        console.log("User loged in sessionstorage 1: ", sessionStorage.getItem("userDetails"));
        this.loginData2 = JSON.parse(sessionStorage.getItem("userDetails")) as UsersInt;
        console.log("user data is: ", this.loginData2);
      }
    });
  }

  refreshBrowserOnce(){
    if(this.loginForm.value.uemail != "" && this.loginForm.value.upass != ""){
      console.log("The loginForm group has something: ", this.loginForm);
      // a refresh action simulation for the browser
      location.reload();
    }
  }

  /**
  * Close my modal window, confession login
  */
  dismissModal2(){
    console.log("my click event for my modal is working. Close confession login");
    this.modalCtrl.dismiss();
  }

  /**
  * My modal function, open signin page in another page
  */
  async openCardModal3(){

    this.dismissModal2(); //if the user is new close the login page after clic signup

    console.log("my click event for my modal is working (open a html page from another one). Open signin");

    const modal = await this.modalCtrl.create({
      component: SigninPage
    });

    await modal.present();
  }

}
