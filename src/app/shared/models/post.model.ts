import { BaseEntity } from './base';
import { Author } from './author.model';

export class Post extends BaseEntity {
  user_id: string | number;
  title: string;
  content: string;
  image: string;
  summary: string;
  featured: boolean;
  user: Author;
  comments: any[];
}
