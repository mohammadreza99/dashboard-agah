import { BaseEntity } from './base';
import { CompanyPosition } from './company-position.model';

export class Stockholder extends BaseEntity {
  firstName: string;
  lastName: string;
  image: string;
  company_position: CompanyPosition;
}
