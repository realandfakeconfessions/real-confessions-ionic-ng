import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginauthService } from '../signin/loginauth.service';
import { ProfilesInt } from './profilesint';
import { MessagesService } from '../messages/messages.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileList = [];
  profileData: ProfilesInt;
  profileForm: FormGroup;

  constructor(
    private loginauthService: LoginauthService,
    public fb: FormBuilder,
    private router: Router,
    private showmess: MessagesService){
    this.profileData = {} as ProfilesInt;
   }

  ngOnInit() {
    this.profileForm = this.fb.group({
      pname: ['', [Validators.required]],
      pdesc: ['', [Validators.required]]
    })

    this.loginauthService.readProfile().subscribe(data => {

      this.profileList = data.map(e => {
        return {
          id: e.payload.doc['id'],
          isEdit: false,
          pname: e.payload.doc.data()['pname'],
          pdesc: e.payload.doc.data()['pdesc']
        };
      })
      console.log("My profile list: ", this.profileList.map(myv => myv));
    });
  }

  createRecord() {
   this.loginauthService.createProfile(this.profileForm.value)
     .then(resp => {
       if(resp){
         this.showmess.presentToast("The new profile was created!");
         this.router.navigateByUrl('/menu/profiles');
       }
       this.profileForm.reset();
     })
     .catch(error => {
       console.log("Error creating a profile in method createRecord()", error);
       this.showmess.presentToast("The profile could not be created! Check your credentials again");
     });
 }

 editRecord(record) {
   record.isEdit = true;
   record.Editpname = record.pname;
   record.Editpdesc = record.pdesc;
 }

 updateRecord(recordRow) {
   let record = {};
   record['pname'] = recordRow.Editpname;
   record['pdesc'] = recordRow.Editpdesc;
   this.loginauthService.updateProfile(recordRow.id, record);
   this.showmess.presentToast("The profile was updated!");
   recordRow.isEdit = false;
 }

 removeRecord(rowID) {
   this.loginauthService.deleteProfile(rowID);
   this.showmess.presentToast("The profile was deleted!");
 }

}
