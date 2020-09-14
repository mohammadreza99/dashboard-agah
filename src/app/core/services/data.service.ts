import { Injectable, ViewContainerRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { PrimeMessageService } from '@prime/prime-service/prime-message.service';
import { PrimeConfirmService } from '@prime/prime-service/prime-confirm.service';
import { PrimeToastService } from '@prime/prime-service/prime-toast.service';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(
    private messager: PrimeMessageService,
    private confirmer: PrimeConfirmService,
    private toaster: PrimeToastService,
    private http: HttpClient
  ) {}

  /////////////////////////////////////////////////////////////////////////////
  //                                GENERAL                                  //
  /////////////////////////////////////////////////////////////////////////////
  //#region GENERAL
  private SIDE_MENU_ITEMS: MenuItem[] = [
    {
      label: 'خانه',
      routerLink: ['/dashboard'],
    },
    {
      label: 'آگاه',
      items: [
        {
          label: 'چشم انداز آگاه',
          routerLink: ['/dashboard/agah/vision'],
          icon: 'pi pi-minus',
        },
        {
          label: 'تاریخچه',
          routerLink: ['/dashboard/agah/history'],
          icon: 'pi pi-minus',
        },
        {
          label: 'بخش های آگاه',
          routerLink: ['/dashboard/agah/departments'],
          icon: 'pi pi-minus',
        },
        {
          label: 'کارمندان',
          routerLink: ['/dashboard/agah/employers'],
          icon: 'pi pi-minus',
        },
        {
          label: 'هیئت مدیره',
          routerLink: ['/dashboard/agah/directors'],
          icon: 'pi pi-minus',
        },
        {
          label: 'سهامداران',
          routerLink: ['/dashboard/agah/stockholders'],
          icon: 'pi pi-minus',
        },
        {
          label: 'مشاوران',
          routerLink: ['/dashboard/agah/counselors'],
          icon: 'pi pi-minus',
        },
        {
          label: 'سمت ها',
          routerLink: ['/dashboard/agah/positions'],
          icon: 'pi pi-minus',
        },
      ],
    },
    {
      label: 'محصولات',
      items: [
        {
          label: 'لیست محصولات',
          routerLink: ['/dashboard/product/list'],
          icon: 'pi pi-minus',
        },
        {
          label: 'ویژگی ها',
          routerLink: ['/dashboard/product/features'],
          icon: 'pi pi-minus',
        },
        {
          label: 'مسیر پروژه',
          routerLink: ['/dashboard/product/process'],
          icon: 'pi pi-minus',
        },
        {
          label: 'همراهان',
          routerLink: ['/dashboard/product/partners'],
          icon: 'pi pi-minus',
        },
      ],
    },
    {
      label: 'چندرسانه ای',
      items: [
        {
          label: 'اخبار',
          routerLink: ['/dashboard/multimedia/news'],
          icon: 'pi pi-minus',
        },
        {
          label: 'مقالات',
          routerLink: ['/dashboard/multimedia/posts'],
          icon: 'pi pi-minus',
        },
        {
          label: 'خبرنامه',
          routerLink: ['/dashboard/multimedia/news-letters'],
          icon: 'pi pi-minus',
        },
      ],
    },
    {
      label: 'آموزش',
      items: [
        {
          label: 'اساتید',
          routerLink: ['/dashboard/education/teachers'],
          icon: 'pi pi-minus',
        },
        {
          label: 'دروس آنلاین',
          routerLink: ['/dashboard/education/courses'],
          icon: 'pi pi-minus',
        },
        {
          label: 'ورکشاپ',
          routerLink: ['/dashboard/education/workshop'],
          icon: 'pi pi-minus',
        },
      ],
    },
    {
      label: 'شغل ها',
      items: [
        {
          label: 'لیست شغل ها',
          routerLink: ['/dashboard/jobs/list'],
          icon: 'pi pi-minus',
        },
        {
          label: 'لیست درخواست ها',
          routerLink: ['/dashboard/jobs/requests'],
          icon: 'pi pi-minus',
        },
      ],
    },
    {
      label: 'تماس با ما',
      items: [
        {
          label: 'شبکه های اجتماعی',
          routerLink: ['/dashboard/contact/socials'],
          icon: 'pi pi-minus',
        },
        {
          label: 'اطلاعات تماس',
          routerLink: ['/dashboard/contact/contact-info'],
          icon: 'pi pi-minus',
        },
        {
          label: 'فرم تماس با ما',
          routerLink: ['/dashboard/contact/contact-comment'],
          icon: 'pi pi-minus',
        },
      ],
    },
    {
      label: 'کاربران',
      items: [
        {
          label: 'کاربران',
          routerLink: ['/dashboard/users/list'],
          icon: 'pi pi-minus',
        },
        {
          label: 'نظرات مشتریان',
          routerLink: ['/dashboard/users/testimonials'],
          icon: 'pi pi-minus',
        },
        {
          label: 'نظرات کاربران',
          routerLink: ['/dashboard/users/comments'],
          icon: 'pi pi-minus',
        },
        {
          label: 'کاربران خبرنامه',
          routerLink: ['/dashboard/users/news-letter-users'],
          icon: 'pi pi-minus',
        },
      ],
    },
    {
      label: 'گالری',
      items: [
        {
          label: 'تصاویر',
          routerLink: ['/dashboard/gallery/images'],
          icon: 'pi pi-minus',
        },
      ],
    },
  ];

  get sideMenuItems(): MenuItem[] {
    return this.SIDE_MENU_ITEMS;
  }

  hasValue(value: any) {
    return value !== null && value !== undefined;
  }

  getValue<T>(observable: Observable<T>) {
    return observable.pipe(filter(this.hasValue)).toPromise();
  }

  itemIsEmpty(item: any): boolean {
    return (
      item.parameter === null ||
      item.parameter === undefined ||
      item.parameter === '' ||
      item.parameter.length === 0
    );
  }

  cancellationConfirm(vcRef: ViewContainerRef): Promise<any> {
    return this.confirmer.show(
      {
        message: 'عملیات لغو شوند؟',
        header: 'لغو عملیات',
        icon: 'fa fa-exclamation-triangle',
      },
      vcRef
    );
  }

  deletionConfirm(vcRef: ViewContainerRef): Promise<any> {
    return this.confirmer.show(
      {
        message: 'آیا از حذف این مورد اطمینان دارید؟',
        header: 'حذف',
        icon: 'fa fa-times',
      },
      vcRef
    );
  }

  successfullMessage(vcRef: ViewContainerRef): Promise<any> {
    return this.toaster.show(
      {
        severity: 'success',
        detail: 'عملیات با موفقیت انجام شد',
        summary: 'انجام شد',
      },
      vcRef
    );
  }

  cloneObj(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  shallowCloneObj(obj) {
    return Object.assign({}, obj);
  }

  checkConnection(): Observable<boolean> {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((observer: Observer<boolean>) => {
        observer.next(navigator.onLine);
        observer.complete();
      })
    );
  }

  getImage(imageUrl: string, options: any) {
    return this.http.get(imageUrl, options);
  }

  getDirtyControls(
    form: FormGroup,
    type: 'object' | 'array' | 'names' = 'object'
  ): {} {
    const kv = Object.entries(form.controls).filter((val) => val[1].dirty);
    const result = {
      object: () =>
        kv.reduce(
          (accum, val) => Object.assign(accum, { [val[0]]: val[1].value }),
          {}
        ),
      array: () => kv.map((val) => val[1]),
      names: () => kv.map((val) => val[0]),
    }[type]();
    return Object.assign(result, { id: form.get('id').value });
  }

  //#endregion GENERAL
}
