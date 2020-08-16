import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PrimeToastService } from 'src/app/@prime/prime-service/prime-toast.service';
import { PrimeMessageService } from 'src/app/@prime/prime-service/prime-message.service';
import { PrimeConfirmService } from 'src/app/@prime/prime-service/prime-confirm.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private toast: PrimeToastService,
    private mess: PrimeMessageService,
    private conf: PrimeConfirmService,
    private vcRef: ViewContainerRef
  ) { }

  ngOnInit(): void { }
  form = new FormGroup({
    autocomplete: new FormControl(null, [Validators.required]),
    checkboxgroup: new FormControl(null, [Validators.required]),
    checkboxsingle: new FormControl(null, [Validators.requiredTrue]),
    colorpicker: new FormControl(null, [Validators.required]),
    datetimepicker: new FormControl(null, [Validators.required]),
    dropdown: new FormControl(null, [Validators.required]),
    file: new FormControl(null, [Validators.required]),
    mask: new FormControl(null, [Validators.required]),
    multiselect: new FormControl(null, [Validators.required]),
    number: new FormControl(null, [Validators.required]),
    pass: new FormControl(null, [Validators.required]),
    radio: new FormControl(null, [Validators.required]),
    slider: new FormControl([20, 30], [Validators.required]),
    switch: new FormControl(null, [Validators.requiredTrue]),
    tags: new FormControl(null, [Validators.required]),
    text: new FormControl(null, [Validators.required]),
    textarea: new FormControl(null, [Validators.required]),
  });

  openConfirm() {
    this.conf
      .show(
        {
          message: 'zahar',
          header: 'aaaaa',
          icon: 'pi pi-exclamation-triangle',
          closable: false,
          acceptLabel: 'سولماز',
          rejectLabel: 'ممد',
          acceptVisible: true,
          rejectVisible: true,
          layout: 'ltr',
          position: 'bottom',
          blockScroll: false,
          defaultFocus: 'reject',
        },
        this.vcRef
      )
      .then(
        (accept) => { },
        (reject) => { }
      );
  }
  openToast() {
    this.toast
      .show({ summary: 'salam', detail: 'salam', closable: true }, this.vcRef, {
        layout: 'ltr',
      })
      .then(
        (resolve) => {
          
        },
        (reject) => {
          
        }
      );
  }
  openMessage() {
    this.mess.show({ summary: 'salam', detail: 'sala' }, this.vcRef, {
      layout: 'rtl',
    });
  }

  onSubmit() {
    
  }
}
