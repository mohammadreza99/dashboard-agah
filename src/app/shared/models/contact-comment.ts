import { BaseEntity } from './base';

export class ContactComment extends BaseEntity {
  name: string;
  email: string;
  comment: string;
  key: string;
  value: string;
  user_id?: number;
  user?: {
    id: number;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
  };
}
