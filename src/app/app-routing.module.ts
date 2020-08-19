import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from '@modules/home/pages/home/home.page';
import { ProductsListPage } from './modules/products/pages/products-list/products-list.page';
import { ProductModifyPage } from './modules/products/pages/product-modify/product-modify.page';
import { LoginPage } from './modules/auth/pages/login/login.page';
import { PartnersPage } from './modules/products/pages/partners/partners.page';
import { ProcessPage } from './modules/products/pages/process/process.page';
import { FeaturesPage } from './modules/products/pages/features/features.page';
import { NewsListPage } from './modules/news/news-list/news-list.page';
import { NewsModifyPage } from './modules/news/news-modify/news-modify.page';
import { PostsListPage } from './modules/posts/pages/posts-list/posts-list.page';
import { PostModifyPage } from './modules/posts/pages/post-modify/post-modify.page';

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
            path: 'edit/:id',
            component: ProductModifyPage,
            data: { breadcrumb: 'edit product' },
          },
          {
            path: 'features',
            component: FeaturesPage,
            data: { breadcrumb: 'features' },
          },
          {
            path: 'process',
            component: ProcessPage,
            data: { breadcrumb: 'process' },
          },
          {
            path: 'partners',
            component: PartnersPage,
            data: { breadcrumb: 'partners' },
          },
        ],
      },
      {
        path: 'news',
        children: [
          {
            path: 'list',
            component: NewsListPage,
            data: { breadcrumb: 'products list' },
          },
          {
            path: 'add',
            component: NewsModifyPage,
            data: { breadcrumb: 'add product' },
          },
          {
            path: 'edit/:id',
            component: NewsModifyPage,
            data: { breadcrumb: 'products list' },
          },
        ],
      },
      {
        path: 'post',
        children: [
          {
            path: 'list',
            component: PostsListPage,
            data: { breadcrumb: 'products list' },
          },
          {
            path: 'add',
            component: PostModifyPage,
            data: { breadcrumb: 'add product' },
          },
          {
            path: 'edit/:id',
            component: PostModifyPage,
            data: { breadcrumb: 'products list' },
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
