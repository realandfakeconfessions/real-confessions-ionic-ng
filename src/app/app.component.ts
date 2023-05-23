import { Component } from '@angular/core';
import { Router,NavigationEnd   } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {

    //this call only one page after refresh
    //this.router.events.subscribe((e) => {
    //  if (e instanceof NavigationEnd) {
    //    console.log(e); //Function that you want to call
    //    this.router.navigateByUrl('/menu/confessions');
    //  }
    //});
  }
}
