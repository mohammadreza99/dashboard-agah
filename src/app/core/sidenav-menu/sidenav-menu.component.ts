import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng';
import { DataService } from '@core/services/data.service';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
})
export class SidenavMenuComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {}

  items: MenuItem[] = this.dataService.sideMenuItems;

  ngOnInit() {}

  authorize() {
    this.authService
      .login({ email: 'admin@gmail.com', password: 123 })
      .subscribe((res) => {
        this.authService.saveToken((res as any).token);
        alert('success!');
      });
  }
}
