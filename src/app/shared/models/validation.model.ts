export type ValidationTypes =
  | 'min'
  | 'max'
  | 'required'
  | 'email'
  | 'minlength'
  | 'maxlength'
  | 'pattern'
  | 'requiredTrue';

export type Validations = {
  [validationType in ValidationTypes]: string;
};
