import { BaseEntity } from './base';
import { Author } from './author.model';

export class News extends BaseEntity {
  title: string;
  content: string;
  image: string;
  summary: string;
  user: Author;
}
