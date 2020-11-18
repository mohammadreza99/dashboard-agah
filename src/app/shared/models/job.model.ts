import { BaseEntity } from './base';

export class JobItemDetails extends BaseEntity {
  title: string;
  details: string[];
  logo: string;
}

export class JobItem extends BaseEntity {
  title: string;
  description: string;
  logo: string;
}

export class JobRequest extends BaseEntity {
  job_id: number | string;
  first_name: string;
  last_name: string;
  birthday: Date;
  gender: string;
  email: string;
  phone: string;
  address: string;
  resume: string;
}
