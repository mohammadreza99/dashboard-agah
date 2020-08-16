import { BaseEntity } from '@shared/models/base';

export class Product extends BaseEntity {
  title: string;
  image: string;
  description: string;
  website: string;
  feature_description: string;
  time_estimate: Date;
  features: Feature[];
  processes: Process[];
  partners: Partner[];
}

export class Feature extends BaseEntity {
  title: string;
  logo: string;
}

export class Process extends BaseEntity {
  title: string;
  image: string;
  description: string;
}

export class Partner extends BaseEntity {
  name: string;
  logo: string;
}
