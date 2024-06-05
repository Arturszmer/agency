import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PeselValidatorService} from "@app/service/validators/pesel-validator.service";
import {regex} from "@app/shared/utils";
import {peselValidator} from "@app/service/validators/pesel-validator";

@Injectable({
  providedIn: 'root'
})
export class ContractorFormService {

  constructor(private fb: FormBuilder, private peselValidatorService: PeselValidatorService) {}

  createContractorForm(): FormGroup {
    return this.fb.group({
      firstName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(regex.latinAndSpaces)]],
      lastName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(regex.lastName)]],
      pesel: [null, { updateOn: 'blur', validators: [Validators.required, peselValidator(this.peselValidatorService)] }],
      birthDate: [null, [Validators.required, Validators.pattern(regex.date)]],
      phone: [null, [Validators.required, Validators.pattern(regex.phone), Validators.maxLength(12)]],
      email: [null, [Validators.required, Validators.pattern(regex.email), Validators.maxLength(30)]],
      addressDto: this.fb.group({
        city: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(regex.latinAndNumbersAndSpaces)]],
        voivodeship: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        zipCode: [null, [Validators.required, Validators.pattern(regex.zipCode)]],
        street: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(regex.latinAndNumbersAndSpaces)]],
        houseNumber: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(15), Validators.pattern(regex.safe)]],
        apartmentNumber: [null, [Validators.maxLength(30), Validators.pattern(regex.safe)]]
      }),
      contractorDescription: [null, [Validators.maxLength(1000), Validators.pattern(regex.safe)]]
    });
  }
}
