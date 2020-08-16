import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DialogFormService } from 'src/app/service/dialog-form.service';
import { DataService } from 'src/app/service/data.service';
import { Product, TagItem } from 'src/app/model/product.model';

@Component({
  selector: 'product-tag-tab',
  templateUrl: './product-tag-tab.component.html',
  styleUrls: ['./product-tag-tab.component.scss']
})
export class ProductTagTabComponent implements OnInit {

  constructor(
    private dialogFormService: DialogFormService,
    private dataService: DataService
  ) {}

  @Input() product: Product;
  @Output() onSelectTag = new EventEmitter();
  @Output() onRemoveTag = new EventEmitter();

  tags: TagItem[];
  selectedTags: TagItem[] = [];

  ngOnInit() {}

  addNewTag() {
    this.dialogFormService
      .show("افزودن تگ", [
        {
          type: "text",
          label: "عنوان",
          labelWidth: 80,
          errors: [{ type: "required", message: "این فیلد الزامی است." }],
          formControlName: "label"
        }
      ])
      .onClose.subscribe(tag => {
        if (tag != null) this.dataService.addTag(tag.label).subscribe();
      });
  }

  onTagSelect(tag) {
    if (this.selectedTags.find(t => t == tag) == undefined) {
      this.selectedTags.push(tag);
      this.onSelectTag.emit(tag);
    }
  }

  onDeleteTag(i) {
    this.selectedTags.splice(i, 1);
    this.onRemoveTag.emit();
  }
}
