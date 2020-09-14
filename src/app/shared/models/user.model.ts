import { BaseEntity } from './base';

export class UserSelect extends BaseEntity {
  name: string;
  email: string;
  email_verified_at: string;
}

export class UserInsert extends BaseEntity {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export class UserLogin {
  email: string;
  password: string | number;
}
