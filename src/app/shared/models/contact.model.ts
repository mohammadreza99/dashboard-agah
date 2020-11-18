import { BaseEntity } from './base';

enum CommentableItem {
  Post = 'post',
  Course = 'course',
  Workshop = 'workshop',
  Comment = 'comment',
}

export class ContactUsInfo {
  address: string;
  email: string;
  phone: string;
  latitude: number;
  longitude: number;
}

export class CommentItem extends BaseEntity {
  name: string;
  email: string;
  comment: string;
  commentable_id: string;
  commentable_type: string;
  comment_replay_id: CommentableItem;
}

export class ContactComment extends BaseEntity {
  name: string;
  email: string;
  comment: string;
  key: string;
  value: string;
}

export class SocialNetwork extends BaseEntity {
  key: string;
  value: string;
}
