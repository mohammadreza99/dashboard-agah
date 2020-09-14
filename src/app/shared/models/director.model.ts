import { BaseEntity } from './base';

export class Director extends BaseEntity {
  first_name: string;
  last_name: string;
  image: string;
  company_position_id: object;
}
