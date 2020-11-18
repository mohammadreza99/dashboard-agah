import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewContainerRef,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { PrimeConfirmService } from '@shared/components/@prime/prime-service/prime-confirm.service';

@Component({
  selector: 'navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss'],
})
export class NavbarMenuComponent implements OnInit {
  @Output() hambergurClick = new EventEmitter();
  accountItems: MenuItem[] = [
    {
      label: 'خروج',
      icon: 'pi pi-sign-out',
      command: (event) => {
        this.confirmService
          .show(
            {
              header: 'خروج از سایت',
              message: 'آیا برای خروج اطمینان دارید؟',
              acceptLabel: 'بلی',
              rejectLabel: 'خیر',
            },
            this.vcRef
          )
          .then(() => {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          });
      },
    },
  ];

  selectedLanguage = localStorage.getItem('lang');
  langueges = [
    { label: 'انگلیسی', value: 'en' },
    { label: 'فارسی', value: 'fa' },
  ];
  userName: string;

  constructor(
    private router: Router,
    private vcRef: ViewContainerRef,
    private confirmService: PrimeConfirmService
  ) {}

  ngOnInit() {
    this.userName = localStorage.getItem('username');
  }

  changeTheme(event) {
    document.querySelector('body').classList.toggle('dark');
  }

  languegeChange(event) {
    localStorage.setItem('lang', event.value);
    document.location.reload();
  }
}
