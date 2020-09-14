import { BaseEntity } from './base';

export class Counselor extends BaseEntity {
  first_name: string;
  last_name: string;
  position: string;
  image: string;
}
