import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { MenuItem } from 'primeng';

@Component({
  selector: 'ag-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(private cd: ChangeDetectorRef) {}

  showSidebar = true;
  isModalSidebar = false;
  breadcrumbItems: MenuItem[] = [
    { label: 'افزودن محصول', routerLink: '/product/add' },
    { label: 'خانه', routerLink: 'home' },
  ];

  @ViewChild('mainContent', { static: true }) mainContent: ElementRef;
  @ViewChild('sidebar', { static: true, read: ElementRef }) sidebar: ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.isModalSidebar = true;
      this.mainContent.nativeElement.classList.remove('mr-278');
    } else {
      this.isModalSidebar = false;
      if (this.showSidebar) {
        this.mainContent.nativeElement.classList.add('mr-278');
      }
      const sidebarMask = document.querySelector('.ui-sidebar-mask');
      if (sidebarMask) {
        sidebarMask.setAttribute('style', 'display:none');
      }
    }
    this.cd.detectChanges();
  }

  onHambergurClick() {
    this.showSidebar = !this.showSidebar;
    if (!this.isModalSidebar) {
      this.mainContent.nativeElement.classList.toggle('mr-278');
    }
  }
}
