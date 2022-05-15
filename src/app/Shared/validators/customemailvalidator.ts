import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  let regexp = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!regexp.test(control.value)) {
      return { pattern: true };
    }

    return null;
  };
}
