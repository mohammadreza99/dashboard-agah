import { BaseEntity } from './base';

export class History extends BaseEntity {
  time: Date;
  description: string;
  image: string;
}
