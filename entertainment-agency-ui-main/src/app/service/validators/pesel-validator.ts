import {AbstractControl, ValidatorFn} from "@angular/forms";
import {PeselValidatorService} from "@app/service/validators/pesel-validator.service";

export function peselValidator(peselService: PeselValidatorService): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const valid = peselService.validate(control.value);
    return valid ? null : {'invalidPesel': {value: control.value}};
  };
}
