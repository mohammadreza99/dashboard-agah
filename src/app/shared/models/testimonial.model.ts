import { BaseEntity } from './base';

export class Testimonial extends BaseEntity {
  first_name: string;
  last_name: string;
  position: string;
  opinion: string;
  image: string;
}
