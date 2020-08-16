import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss'],
})
export class NavbarMenuComponent implements OnInit {
  @Output() hambergurClick = new EventEmitter();
  accountItems: MenuItem[] = [
    { label: 'پروفایل', icon: 'fad fa-book' },
    { label: 'خروج', icon: 'fad fa-book' },
  ];

  constructor() {}
  ngOnInit() {}
  changeTheme() {
    document.querySelector('body').classList.toggle('dark');
  }
}
