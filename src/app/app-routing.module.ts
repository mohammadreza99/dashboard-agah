import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from '@modules/home/pages/home/home.page';
import { ProductsListPage } from './modules/products/pages/products-list/products-list.page';
import { ProductModifyPage } from './modules/products/pages/product-modify/product-modify.page';
import { LoginPage } from './modules/auth/pages/login/login.page';
import { PartnersPage } from './modules/products/pages/partners/partners.page';
import { ProcessPage } from './modules/products/pages/process/process.page';
import { FeaturesPage } from './modules/products/pages/features/features.page';
import { NewsPage } from './modules/multimedia/pages/news/news.page';
import { PostsPage } from './modules/multimedia/pages/posts/posts.page';
import { HistoriesPage } from './modules/agah/pages/histories/histories.page';
import { StockholdersPage } from './modules/agah/pages/stockholders/stockholders.page';
import { EmployeesPage } from './modules/agah/pages/employees/employees.page';
import { DirectorsPage } from './modules/agah/pages/directors/directors.page';
import { CounselorsPage } from './modules/agah/pages/counselors/counselors.page';
import { VisionPage } from './modules/agah/pages/vision/vision.page';
import { DepartmentsPage } from './modules/agah/pages/departments/departments.page';
import { PositionsPage } from './modules/agah/pages/positions/positions.page';
import { ContactsPage } from './modules/contact/pages/contacts/contacts.page';
import { SocialsPage } from './modules/contact/pages/socials/socials.page';
import { TestimonialsPage } from './modules/users/pages/testimonials/testimonials.page';
import { JobsPage } from './modules/jobs/pages/jobs/jobs.page';
import { JobDetailsPage } from './modules/jobs/pages/job-details/job-details.page';
import { AuthGuard } from './core/guards/auth.guard';
import { ContactCommentPage } from './modules/contact/pages/contact-comment/contact-comment.page';
import { TeachersPage } from './modules/education/pages/teachers/teachers.page';
import { CoursesPage } from './modules/education/pages/courses/courses.page';
import { CourseContentsPage } from './modules/education/pages/course-contents/course-contents.page';
import { WorkshopPage } from './modules/education/pages/workshop/workshop.page';
import { CommentsPage } from './modules/users/pages/comments/comments.page';
import { JobRequestsPage } from './modules/jobs/pages/job-requests/job-requests.page';
import { UsersPage } from './modules/users/pages/users/users.page';
import { NewsLetterUsersPage } from './modules/users/pages/news-letter-users/news-letter-users.page';
import { NewsLettersPage } from './modules/multimedia/pages/news-letters/news-letters.page';
import { DashboardPage } from './modules/home/pages/dashboard/dashboard.page';
import { TagsPage } from './modules/multimedia/pages/tags/tags.page';
import { GalleryPage } from './modules/gallery/pages/gallery/gallery.page';
import { CategoriesPage } from './modules/education/pages/categories/categories.page';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPage,
    data: { title: '????????' },
  },
  {
    path: 'dashboard',
    component: HomePage,
    data: { title: '' },
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardPage,
      },
      {
        path: 'agah',
        children: [
          {
            path: 'vision',
            component: VisionPage,
            data: { title: '?????? ?????????? ????????' },
          },
          {
            path: 'history',
            component: HistoriesPage,
            data: { title: '??????????????' },
          },
          {
            path: 'departments',
            component: DepartmentsPage,
            data: { title: '?????? ?????? ????????' },
          },
          {
            path: 'stockholders',
            component: StockholdersPage,
            data: { title: '??????????????????' },
          },
          {
            path: 'employers',
            component: EmployeesPage,
            data: { title: '????????????????' },
          },
          {
            path: 'directors',
            component: DirectorsPage,
            data: { title: '???????? ??????????' },
          },
          {
            path: 'counselors',
            component: CounselorsPage,
            data: { title: '??????????????' },
          },
          {
            path: 'positions',
            component: PositionsPage,
            data: { title: '?????? ????' },
          },
        ],
      },
      {
        path: 'product',
        children: [
          {
            path: 'list',
            component: ProductsListPage,
            data: { title: '??????????????' },
          },
          {
            path: 'add',
            component: ProductModifyPage,
            data: { title: '???????????? ??????????' },
          },
          {
            path: 'edit/:id',
            component: ProductModifyPage,
            data: { title: '???????????? ??????????' },
          },
          {
            path: 'features',
            component: FeaturesPage,
            data: { title: '?????????? ????' },
          },
          {
            path: 'process',
            component: ProcessPage,
            data: { title: '???????? ??????????' },
          },
          {
            path: 'partners',
            component: PartnersPage,
            data: { title: '?????????????? ??????????' },
          },
        ],
      },
      {
        path: 'multimedia',
        children: [
          {
            path: 'news',
            component: NewsPage,
            data: { title: '??????????' },
          },
          {
            path: 'posts',
            component: PostsPage,
            data: { title: '????????????' },
          },
          {
            path: 'news-letters',
            component: NewsLettersPage,
            data: { title: '??????????????' },
          },
          {
            path: 'tags',
            component: TagsPage,
            data: { title: '???? ????' },
          },
        ],
      },
      {
        path: 'education',
        children: [
          {
            path: 'categories',
            component: CategoriesPage,
            data: { title: '???????? ????????' },
          },
          {
            path: 'teachers',
            component: TeachersPage,
            data: { title: '????????????' },
          },
          {
            path: 'courses',
            component: CoursesPage,
            data: { title: '???????? ????????????' },
          },
          {
            path: 'workshop',
            component: WorkshopPage,
            data: { title: '????????????' },
          },
          {
            path: 'course-content/:id',
            component: CourseContentsPage,
            data: { title: '???????????? ????????' },
          },
        ],
      },
      {
        path: 'jobs',
        children: [
          {
            path: 'list',
            component: JobsPage,
            data: { title: '?????? ????' },
          },
          {
            path: 'details/:id',
            component: JobDetailsPage,
            data: { title: '???????????? ??????' },
          },
          {
            path: 'requests',
            component: JobRequestsPage,
            data: { title: '???????? ?????? ???????? ?????????? ??????' },
          },
        ],
      },
      {
        path: 'contact',
        children: [
          {
            path: 'contact-info',
            component: ContactsPage,
            data: { title: '?????????????? ????????' },
          },
          {
            path: 'contact-comment',
            component: ContactCommentPage,
            data: { title: '?????? ???????? ???? ????' },
          },
          {
            path: 'socials',
            component: SocialsPage,
            data: { title: '???????? ?????? ??????????????' },
          },
        ],
      },
      {
        path: 'users',
        children: [
          {
            path: 'list',
            component: UsersPage,
            data: { title: '??????????????' },
          },
          {
            path: 'testimonials',
            component: TestimonialsPage,
            data: { title: '?????????? ??????????????' },
          },
          {
            path: 'comments',
            component: CommentsPage,
            data: { title: '?????????? ??????????????' },
          },
          {
            path: 'news-letter-users',
            component: NewsLetterUsersPage,
            data: { title: '?????????????? ??????????????' },
          },
        ],
      },
      {
        path: 'gallery',
        children: [
          {
            path: 'images',
            component: GalleryPage,
            data: { title: '??????????' },
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
