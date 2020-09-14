import { BaseEntity } from './base';

export class Comment extends BaseEntity {
  name: string;
  email: string;
  comment: string;
  commentable_id: object;
  commentable_type: 'post' | 'course' | 'workshop';
  comment_replay_id: object;
}
