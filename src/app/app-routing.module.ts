import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from '@modules/home/pages/home/home.page';
import { ProductsListPage } from './modules/products/pages/products-list/products-list.page';
import { ProductModifyPage } from './modules/products/pages/product-modify/product-modify.page';
import { LoginPage } from './modules/auth/pages/login/login.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    data: { breadcrumb: '' },
  },
  {
    path: 'login',
    component: LoginPage,
    data: { breadcrumb: '' },
  },
  {
    path: 'dashboard',
    component: HomePage,
    data: { breadcrumb: '' },
    children: [
      {
        path: 'product',
        children: [
          {
            path: 'list',
            component: ProductsListPage,
            data: { breadcrumb: 'products list' },
          },
          {
            path: 'add',
            component: ProductModifyPage,
            data: { breadcrumb: 'add product' },
          },
          {
            path: 'edit',
            component: ProductModifyPage,
            data: { breadcrumb: 'edit product' },
          },
          {
            path: 'features',
            component: ProductModifyPage,
            data: { breadcrumb: 'edit product' },
          },
          {
            path: 'process',
            component: ProductModifyPage,
            data: { breadcrumb: 'edit product' },
          },
          {
            path: 'partners',
            component: ProductModifyPage,
            data: { breadcrumb: 'edit product' },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
