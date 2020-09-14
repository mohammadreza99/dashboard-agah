import { BaseEntity } from './base';

export class NewsLetter extends BaseEntity {
  title: string;
  template: string;
  schedule: Date;
}

export class NewsLetterUser extends BaseEntity {
  email: string;
}
