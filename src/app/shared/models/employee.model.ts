import { BaseEntity } from './base';

export class Employee extends BaseEntity {
  first_name: string;
  last_name: string;
  image: string;
  company_position_id: object;
  social_accounts: { linkedin: string };
}
