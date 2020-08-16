import { BaseEntity } from './base';

export class Testimonial extends BaseEntity {
  firstName: string;
  lastName: string;
  position: string;
  opinion: string;
  image: string;
}
