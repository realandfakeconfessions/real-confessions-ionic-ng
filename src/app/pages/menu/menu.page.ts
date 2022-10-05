import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = [
    {
      title: 'Confessions Page',
      url: '/menu/confessions',
      icon: 'heart'
    },
    {
      title: 'Languages Page',
      url: '/menu/languages',
      icon: 'warning'
    },
    {
      title: 'Category Page',
      url: '/menu/categories',
      icon: 'book'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
