import { BaseEntity } from './base';

export class Post extends BaseEntity {
  title: string;
  content: string;
  image: string;
  summary: string;
  short_link: string;
  featured: boolean;
  views: number;
  read_time: number;
  comments: any[];
  tags: any[];
  user?: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  };
}

export class News extends BaseEntity {
  title: string;
  content: string;
  image: string;
  summary: string;
  short_link: string;
  tags: any[];
  user?: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  };
}

export class Tag extends BaseEntity {
  tag: string;
}
