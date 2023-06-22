import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { HttpClient  } from '@angular/common/http';
import { LoginauthService } from '../signin/loginauth.service';
import { UsersInt } from '../signin/usersint';
import { CountriesInt } from '../signin/countriesint';
import { MessagesService } from '../messages/messages.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  public ipAddress: string;
  public ipCountry: string;
  public dateString: string;
  url1: string = "https://jsonip.com";
  url2: string = "https://ip.me";
  signupData: UsersInt;
  countriesInt: CountriesInt;
  signupForm: FormGroup;
  signupForm2: FormGroup;
  usercountry: string;

  constructor(private http: HttpClient,
    private myloginser: LoginauthService,
    private showmess: MessagesService,
    private router: Router,
    public fb: FormBuilder,
    public fb2: FormBuilder,
    private modalCtrl: ModalController,
    @Inject(LOCALE_ID) private locale: string) {
      this.signupData = {} as UsersInt;
      this.countriesInt = {} as CountriesInt;
      this.dateString = formatDate(Date.now(),'dd-MM-yyyy_HH:m:s',this.locale);
     }

  ngOnInit() {
    this.getUserIP();
    console.log("ip from ngoninit: ", this.ipAddress);
    console.log("ip country ngoninit: ", this.ipCountry);
    this.signupForm = this.fb.group({
      uemail: ['', [Validators.required]],
      upass: ['', [Validators.required]],
      ualias: ['', [Validators.required]],
      urolecod: ['', [Validators.required]]
    });
  }


  /**
  * sign up new users
  */
  signupUser2() {

    console.log("Method signupUser2() started: ");

    this.signupForm2 = this.fb2.group({
      uemail: [this.signupForm.value.uemail],
      upass: [this.signupForm.value.upass]
    });

    this.myloginser.createUser2(this.signupForm2.value)
      .then(resp => {
        if(resp){
          const path = "Users";
          const id = resp.user.uid;
          if(this.ipCountry != "" && this.usercountry != ""){
            console.log("country name is: ", this.usercountry);
          }

          this.signupForm2 = this.fb2.group({
            uid: [this.signupForm.value.uid = id],
            uemail: [this.signupForm.value.uemail],
            upass: [this.signupForm.value.upass],
            ualias: [this.signupForm.value.ualias],
            ucountry: [this.usercountry],
            uregpip: [this.ipAddress],
            uregdate: [this.dateString],
            urolecod: [this.signupForm.value.urolecod]
           });

          this.myloginser.createUser3(this.signupForm2.value, path, id);
          this.showmess.presentToast("The new user was created!");
          this.router.navigateByUrl('/menu/confessions');
          this.dismissModal2();
        }
        this.signupForm.reset();
      })
      .catch(error => {
        console.log(error);
        this.showmess.presentToast("The user could not be created! Check your credentials again");
      });
  }

  /**
  * Check what is the user country
  * that want to sign up
  **/
  getCountryByid(){
    console.log("Method getCountryByid(): started");
    const path = "Countries";
    let mycid = "";
    if(this.ipCountry != ""){
      mycid = this.ipCountry;
      this.myloginser.getDocById<CountriesInt>(path, mycid).subscribe( res => {
        if (res) {
          this.countriesInt = res;
          console.log("country data is: ", this.countriesInt);
          this.usercountry = this.countriesInt.country;
        } else {
          this.usercountry = "Unknown Country";
        }
      });
    }
  }

  /**
  * Check what is the user ip
  * that want to sign up
  **/
  getUserIP(){

    this.myloginser.getUseripServ2(this.url1).toPromise().then( (res:any) => {
      if(res){
        console.log("A response was found!", res);
        this.ipAddress = res.ip;
        this.ipCountry = res.country;
        if(this.ipCountry != ""){
          this.getCountryByid();
        }
      }
    })
    .catch(error => {
      console.log("Error getting user ip: ", error);
    });

  }


  /**
  * Close my modal window, confession signin
  */
  dismissModal2(){
    console.log("my click event for my modal is working. Close confession signin");
    this.modalCtrl.dismiss();
  }


}
