import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { MenuItem } from 'primeng';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ag-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  showSidebar = true;
  isModalSidebar = false;
  breadcrumbItems: MenuItem[] = [];

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

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(
        () =>
          (this.breadcrumbItems = [
            ...this.createBreadcrumbs(this.route.root),
            { label: 'خانه', routerLink: '/' },
          ])
      );
  }

  createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: MenuItem[] = []
  ): MenuItem[] {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }
    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }
      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        breadcrumbs.push({ label, url });
      }
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }

  onHambergurClick() {
    this.showSidebar = !this.showSidebar;
    if (!this.isModalSidebar) {
      this.mainContent.nativeElement.classList.toggle('mr-278');
    }
  }
}
