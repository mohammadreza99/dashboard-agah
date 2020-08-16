import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { ExtraField } from 'src/app/model/product.model';
import { PrimeTree } from 'src/app/@prime/prime-model/prime-tree.model';

@Component({
  selector: 'product-extra-field-modify-page',
  templateUrl: './product-extra-field-modify-page.html',
  styleUrls: ['./product-extra-field-modify-page.scss']
})
export class ProductExtraFieldModifyPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dataService: DataService,
    private vcRef: ViewContainerRef
  ) {}

  extraField: ExtraField = new ExtraField();
  extraFieldListItem: string;
  treeCategories: PrimeTree[] = [];
  selectedCategories: PrimeTree[] = [];
  pageTitle: string = "افزودن مشخصات اضافی";
  editMode: boolean = false;
  types$ = null;

  ngOnInit() {
    let snapshot = this.route.snapshot;
    //TODO: چرا تایپس رو نال میندازه؟ با وجود چک کردن اینکه نال نباشه، بازم نال میندازه و ارور میده توی اچ تی ام ال.
    //TODO: ایا مثل پایپ ایسینک، چیزی برای تایپسکریپت وجود داره که بدون سابسکرایب اطلاعات رو بگیریم و ازش استفاده کنیم؟
    //TODO: چطوری پراپرتی کلید خارجی رو از یه موجودیت پر کنیم؟ مثلا توی اکسترافیلد سرویس، گروپش رو پر کنیم؟
    //TODO: وچطوری با وجود جنریک ریپوزیتوری، یه ورودی بگیریم که بگیم چه چیزایی رو اینکلود کنه؟ مثلا برای متد گت بای آیدی چطوری اینکلود بزنیم؟
    //TODO: نحوه automigration?
    this.types$ = this.dataService.getExtraFieldTypes();

    if (snapshot.params["id"]) {
      this.editMode = true;
      this.dataService
        .getExtraFieldById(snapshot.params["id"])
        .subscribe(extraField => {
          this.extraField = extraField.result;
          this.pageTitle = "ویرایش مشخصات اضافی - " + this.extraField.label;
          this.dataService.getCategories().subscribe(categories => {
            this.treeCategories = this.dataService.getTreeModelCategories(
              categories.result
            );
            for (const id of this.extraField.categoryIds)
              this.selectedCategories.push(
                this.dataService.getTreeNodeById(this.treeCategories, id)
              );
          });
        });
    } else {
      this.editMode = false;
      this.extraField.group = {
        id: +snapshot.queryParams["groupId"],
        label: snapshot.queryParams["groupLabel"]
      };
      this.dataService.getCategories().subscribe(categories => {
        this.treeCategories = this.dataService.getTreeModelCategories(
          categories.result
        );
      });
    }
  }

  onAddListItemClick() {
    if (this.extraFieldListItem && this.extraFieldListItem != "") {
      this.extraField.listItems.push(this.extraFieldListItem);
      this.extraFieldListItem = "";
    }
  }

  onRemoveListItemClick(i: number) {
    this.extraField.listItems.splice(i, 1);
  }

  onTypeChange(event) {
    if (event != 1) this.extraField.listItems = [];
  }

  onSaveClick() {
    this.extraField.categoryIds = [];
    for (const category of this.selectedCategories)
      this.extraField.categoryIds.push(category.data.id);

    if (!this.editMode) {
      this.dataService.addExtraField(this.extraField).subscribe();
    } else {
      this.dataService.updateExtraField(this.extraField).subscribe();
    }
    this.router.navigate([
      "/product/extra-field/list/" + this.extraField.group.id
    ]);
  }

  onCancelClick() {
    this.dataService.cancellationConfirm(this.vcRef).then(() => {
      this.router.navigate([
        "/product/extra-field/list/" + this.extraField.group.id
      ]);
    });
  }
}
