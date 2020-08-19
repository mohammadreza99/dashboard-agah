import { BaseEntity } from './base';
import { SocialNetwork } from './social-network.model';
import { CompanyPosition } from './company-position.model';

export class Employee extends BaseEntity {
  first_name: string;
  last_name: string;
  image: string;
  position_id: string | number;
  position: CompanyPosition;
  social_accounts: { linkedin: string };
}
