import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '@app/shared/models/post.model';
import { News } from '@app/shared/models/news.model';

@Component({
  selector: 'ag-content-form',
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.scss'],
})
export class ContentFormComponent implements OnInit {
  constructor() {}

  @Input() show = false;
  @Input() set content(value: News | Post) {
    this._content = value;
    this.form.get('content').setValue(this._content?.content);
  }
  @Output() submitted = new EventEmitter();
  @Output() showChange = new EventEmitter();

  _content: News | Post;
  form = new FormGroup({
    content: new FormControl(null, Validators.required),
  });

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit({
        id: this._content?.id,
        content: this._content?.content,
      });
    }
  }

  onCancel() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  ngOnInit(): void {}
}
