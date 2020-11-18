import { BaseEntity } from './base';

export class Author extends BaseEntity {
  name: string;
  email: string;
}

export class CompanyPosition extends BaseEntity {
  title: string;
}

export class Stockholder extends BaseEntity {
  name: string;
  image: string;
}

export class Counselor extends BaseEntity {
  first_name: string;
  last_name: string;
  position: string;
  image: string;
}

export class Department extends BaseEntity {
  title: string;
  body: string;
  logo: string;
}

export class Director extends BaseEntity {
  first_name: string;
  last_name: string;
  image: string;
  company_position_id: number | string;
}

export class Employee extends BaseEntity {
  first_name: string;
  last_name: string;
  image: string;
  company_position_id: number | string;
  social_accounts: { linkedin: string };
}

export class HistoryItem extends BaseEntity {
  time: Date;
  description: string;
  image: string;
}

export class Vision extends BaseEntity {
  key: 'vision';
  text: string;
}

export class Testimonial extends BaseEntity {
  first_name: string;
  last_name: string;
  position: string;
  opinion: string;
  image: string;
}

export class GalleryItem extends BaseEntity {
  title: string;
  images: string[];
}

export class Breadcrumb {
  label: string;
  url: string;
}

export class NewsLetter extends BaseEntity {
  title: string;
  template: string;
  schedule: Date;
}
