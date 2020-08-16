import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { ProductListPage } from './product-list-page/product-list-page';
import { ProductModifyPage } from './product-modify-page/product-modify-page';
import { ProductExtraFieldGroupListPage } from './product-extra-field-group-list-page/product-extra-field-group-list-page';
import { ProductExtraFieldListPage } from './product-extra-field-list-page/product-extra-field-list-page';
import { ProductExtraFieldModifyPage } from './product-extra-field-modify-page/product-extra-field-modify-page';
import { ProductFeatureListPage } from './product-feature-list-page/product-feature-list-page';
import { ProductCategoryListPage } from './product-category-list-page/product-category-list-page';
import { ProductCategoryModifyPage } from './product-category-modify-page/product-category-modify-page';
import { ProductTagListPage } from './product-tag-list-page/product-tag-list-page';
import { ProductBrandListPage } from './product-brand-list-page/product-brand-list-page';
import { CustomerListPage } from './customer-list-page/customer-list-page';
import { CustomerModifyPage } from './customer-modify-page/customer-modify-page';
import { CustomerOrderListPage } from './customer-order-list-page/customer-order-list-page';
import { CustomerOrderModifyPage } from './customer-order-modify-page/customer-order-modify-page';
import { CustomerGroupListPage } from './customer-group-list-page/customer-group-list-page';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'product',
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ProductListPage,
      },
      {
        path: 'add',
        component: ProductModifyPage,
      },
      {
        path: 'edit/:id',
        component: ProductModifyPage,
      },
      {
        path: 'extra-field-group',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: ProductExtraFieldGroupListPage,
          },
        ],
      },
      {
        path: 'extra-field',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: ProductExtraFieldListPage,
          },
          {
            path: 'add',
            component: ProductExtraFieldModifyPage,
          },
          {
            path: 'edit/:id',
            component: ProductExtraFieldModifyPage,
          },
        ],
      },
      {
        path: 'feature',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: ProductFeatureListPage,
          },
        ],
      },
      {
        path: 'category',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: ProductCategoryListPage,
          },
          {
            path: 'add',
            component: ProductCategoryModifyPage,
          },
          {
            path: 'edit/:id',
            component: ProductCategoryModifyPage,
          },
        ],
      },
      {
        path: 'tag',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: ProductTagListPage,
          },
        ],
      },
      {
        path: 'brand',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: ProductBrandListPage,
          },
        ],
      },
      //   {
      //     path: 'review',
      //     component: ProductReviewPage,
      //   },
      //   {
      //     path: 'related',
      //     component: ProductRelatedPage,
      //   },
      //   {
      //     path: 'in-queue',
      //     component: ProductInQueuePage,
      //   },
    ],
  },
  {
    path: 'customer',
    children: [
      {
        path: '',
        redirectTo: 'group',
        pathMatch: 'full',
      },
      {
        path: 'list/:id',
        component: CustomerListPage,
      },
      {
        path: 'add',
        component: CustomerModifyPage,
      },
      {
        path: 'edit/:id',
        component: CustomerModifyPage,
      },
      {
        path: 'order',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: CustomerOrderListPage,
          },
          {
            path: 'list/:id',
            component: CustomerOrderListPage,
          },
          {
            path: 'edit/:id',
            component: CustomerOrderModifyPage,
          },
        ],
      },
      //   {
      //     path: 'send-sms/:id',
      //     component: CustomerSendSmsPage,
      //   },
      //   {
      //     path: 'send-email/:id',
      //     component: CustomerSendEmailPage,
      //   },
      {
        path: 'group',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: CustomerGroupListPage,
          },
        ],
      },
    ],
  },
  //   {
  //     path: "customers",
  //     children: [
  //       {
  //         path: "addresses"
  //       },
  //       {
  //         path: "orders"
  //       }
  //     ]
  //   },
  //   {
  //     path: "newsletters",
  //     children: [
  //       {
  //         path: "management"
  //       },
  //       {
  //         path: "subscribers"
  //       }
  //     ]
  //   }
  //   {
  //     path: "management",
  //     children: [
  //       {
  //         path: "list"
  //       },
  //       {
  //         path: "roles"
  //       },
  //       {
  //         path: "access-level"
  //       }
  //     ]
  //   },
  //   {
  //     path: "reports",
  //     children: [
  //       {
  //         path: "available-products"
  //       },
  //       {
  //         path: "unavailable-products"
  //       },
  //       {
  //         path: "not-purchased-products"
  //       },
  //       {
  //         path: "managers-performance"
  //       },
  //       {
  //         path: "store-income"
  //       }
  //     ]
  //   },
  //   {
  //     path: "setting",
  //     children: [
  //       {
  //         path: "setting/general"
  //       },
  //       {
  //         path: "setting/send-message"
  //       },
  //       {
  //         path: "setting/content-management"
  //       },
  //       {
  //         path: "setting/static-pages"
  //       }
  //     ]
  //   },
  //   {
  //     path: "articles"
  //   }
];
