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
  countryList = [];
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
    //this.getCountries();
    console.log("ip from ngoninit: ", this.ipAddress);
    console.log("ip country ngoninit: ", this.ipCountry);
    this.signupForm = this.fb.group({
      uemail: ['', [Validators.required]],
      upass: ['', [Validators.required]],
      ualias: ['', [Validators.required]],
      urolecod: ['', [Validators.required]]
    })
  }

  /**
  * sign up new users
  */
  signupUser() {
    console.log("Method signupUser() started: ");

    this.signupForm2 = this.fb2.group({
      uemail: [this.signupForm.value.uemail],
      upass: [this.signupForm.value.upass],
      ualias: [this.signupForm.value.ualias],
      ucountry: [this.ipCountry],
      uregpip: [this.ipAddress],
      uregdate: [this.dateString],
      urolecod: [this.signupForm.value.urolecod]
    });

    this.myloginser.createUser(this.signupForm2.value)
      .then(resp => {
        if(resp){
          console.log("My new user is: ", resp);
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

  getCountries(){

    console.log("Method getCountries(): started");

      console.log("Country code this.ipCountry is: ", this.ipCountry);

      this.myloginser.readCountry().subscribe(data => {

        this.countryList = data.map(e => {
          return {
            id: e.payload.doc['id'],
            alpha2: e.payload.doc.data()['alpha2'],
            cid: e.payload.doc.data()['cid'],
            country: e.payload.doc.data()['country'],
          };
        })
        //console.log("My country list: ", this.countryList.map(myv => myv));
      });

  }

  getCountries2(){
    if (this.countryList.length > 0 && this.ipCountry != ""){
      for (let i = 0; i < this.countryList.length; i++){
        //console.log("A for bucle to a list: ", this.countryList[i]);
        if(this.countryList[i].alpha2 == this.ipCountry){
          this.usercountry = this.countryList[i].country;
          console.log("Your country code is: ", this.countryList[i].cid);
          console.log("Your country name is: ", this.usercountry);
        }
      }
    }

  }

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

  getUserIP2(){
    this.http.get(this.url1).subscribe((res:any) => {
      console.log(res);
      this.ipAddress = res.ip;
      this.ipCountry = res.country;
      console.log("user ip is: ", this.ipAddress);
    },
    (error) => {
      console.log("Error getting user ip, method getUserIP2(): ", error);
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
