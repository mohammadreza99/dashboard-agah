import { BaseEntity } from './base';

export class Post extends BaseEntity {
  title: string;
  content: string;
  image: string;
  summary: string;
}
