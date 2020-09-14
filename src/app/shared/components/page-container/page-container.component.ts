import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ag-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss'],
})
export class PageContainerComponent implements OnInit {
  @Input() title: string;

  constructor() {}

  ngOnInit(): void {}
}
