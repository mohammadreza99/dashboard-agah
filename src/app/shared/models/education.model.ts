import { BaseEntity } from './base';

export class Teacher extends BaseEntity {
  first_name: string;
  last_name: string;
  position: string;
  description: string;
  linkedin: string;
  image: string;
}

export class CourseContent extends BaseEntity {
  title: string;
  content: string;
  video: string;
  week: number;
}

export class Course extends BaseEntity {
  teacher_id: string;
  title: string;
  content: string;
  image: string;
  teacher?: Teacher;
  contents?: CourseContent[];
  category_id: number;
  tags: any[];
  best: boolean;
}

export class Workshop extends BaseEntity {
  title: string;
  content: string;
  image: string;
  teacher_id: number | string;
  time: Date;
  link: string;
  address: string;
  category_id: number;
}

export class Category extends BaseEntity {
  label: string;
}
