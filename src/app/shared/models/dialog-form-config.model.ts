import { SelectItem } from 'primeng/api';
import { PrimeError } from '@shared/components/@prime/prime-model/prime-error.model';

export type DialogFormConfig =
  | {
      type: 'text';
      label?: string;
      labelWidth?: number;
      readonly?: boolean;
      numberOnly?: boolean;
      placeholder?: string;
      formControlName: string;
      errors?: PrimeError[];
      value?: any;
    }
  | {
      type: 'link';
      label?: string;
      labelWidth?: number;
      readonly?: boolean;
      placeholder?: string;
      formControlName: string;
      errors?: PrimeError[];
      value?: any;
    }
  | {
      type: 'textarea';
      label?: string;
      labelWidth?: number;
      readonly?: boolean;
      placeholder?: string;
      formControlName: string;
      errors?: PrimeError[];
      value?: any;
    }
  | {
      type: 'dropdown';
      label?: string;
      labelWidth?: number;
      placeholder?: string;
      readonly?: boolean;
      formControlName: string;
      errors?: PrimeError[];
      dropdownItems: SelectItem[];
      value?: any;
    }
  | {
      type: 'multi-select';
      label?: string;
      labelWidth?: number;
      placeholder?: string;
      readonly?: boolean;
      formControlName: string;
      errors?: PrimeError[];
      multiSelectItems: SelectItem[];
      value?: any;
    }
  | {
      type: 'color-picker';
      label?: string;
      labelWidth?: number;
      formControlName: string;
      errors?: PrimeError[];
      value?: any;
      inline?: boolean;
    }
  | {
      type: 'image-picker';
      label?: string;
      labelWidth?: number;
      formControlName: string;
      errors?: PrimeError[];
      urlToShow?: string;
      value?: any;
      accept?: string;
    }
  | {
      type: 'multi-image-picker';
      label?: string;
      labelWidth?: number;
      formControlName: string;
      errors?: PrimeError[];
      value?: any;
    }
  | {
      type: 'date-picker';
      label?: string;
      datePickerMode?: string;
      labelWidth?: number;
      formControlName: string;
      errors?: PrimeError[];
      value?: any;
    }
  | {
      type: 'tags';
      label?: string;
      labelWidth?: number;
      field: string;
      formControlName: string;
      errors?: PrimeError[];
      value?: any;
    }
  | {
      type: 'editor';
      label?: string;
      labelWidth?: number;
      formControlName: string;
      errors?: PrimeError[];
      value?: any;
    }
  | {
      type: 'checkbox';
      label?: string;
      labelWidth?: number;
      formControlName: string;
      errors?: PrimeError[];
      value?: any;
    }
  | {
      type: 'hidden';
      formControlName: string;
      value?: any;
    };
