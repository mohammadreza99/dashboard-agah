import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ErrorService } from './core/services/error.service';
import { PrimeToastService } from './shared/components/@prime/prime-service/prime-toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private errorService: ErrorService,
    private toastService: PrimeToastService,
    private vcRef: ViewContainerRef
  ) {}
  ngOnInit() {
    this.errorService.getError().subscribe((error) => {
      if (error) {
        this.toastService.show(
          { summary: 'خطا', detail: error, severity: 'error' },
          this.vcRef
        );
      }
    });
  }
}
