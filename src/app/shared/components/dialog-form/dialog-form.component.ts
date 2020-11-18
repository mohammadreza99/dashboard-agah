import { Component, OnInit, Optional } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng';

@Component({
  selector: 'dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss'],
})
export class DialogFormComponent implements OnInit {
  constructor(
    @Optional() public dialogConfig: DynamicDialogConfig,
    @Optional() private dialogRef: DynamicDialogRef
  ) {}

  form = new FormGroup({});
  validators: ValidatorFn[] = [];

  ngOnInit() {
    for (const item of this.dialogConfig.data) {
      this.form.addControl(item.formControlName, new FormControl(undefined));
      if (item.errors) {
        for (const error of item.errors) {
          this.validators.push(Validators[error.type]);
        }
        this.form.controls[item.formControlName].setValidators([
          ...this.validators,
        ]);
      }
      if (item.type === 'dropdown') {
        (item.dropdownItems as Array<any>).unshift({
          label: 'انتخاب کنید',
          value: null,
        });
      }
      if (item.type === 'link') {
        this.form.controls[item.formControlName].setValidators([
          ...this.validators,
          Validators.pattern(
            '[Hh][Tt][Tt][Pp][Ss]?://(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::d{2,5})?(?:/[^s]*)?'
          ),
        ]);
      }
      if (item.value) {
        if (item.type == 'date-picker') {
          this.form
            .get(item.formControlName)
            .setValue((item.value.toDate() as Date).toISOString());
        } else {
          this.form.get(item.formControlName).setValue(item.value);
        }
      }
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
