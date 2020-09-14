import { BaseEntity } from './base';

export class News extends BaseEntity {
  title: string;
  content: string;
  image: string;
  summary: string;
}
