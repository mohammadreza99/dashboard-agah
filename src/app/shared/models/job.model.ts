import { BaseEntity } from './base';

export class JobItemDetails extends BaseEntity {
  job_id: string | number;
  title: string;
  logo: string;
  details: string[];
}

export class JobItem extends BaseEntity {
  title: string;
  description: string;
  logo: string;
  is_active: string;
  details: JobItemDetails[];
}

export class JobRequest extends BaseEntity {
  job_id: string | number;
  first_name: string;
  last_name: string;
  birthday: Date;
  gender: string;
  email: string;
  phone: string;
  address: string;
  resume: string;
}
