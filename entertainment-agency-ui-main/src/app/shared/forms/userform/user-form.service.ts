import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {regex} from "@app/shared/utils";

@Injectable({
  providedIn: 'root'
})
export class UserFormService {

  constructor(private fb: FormBuilder) { }

  createUserForm(): FormGroup {
    return this.fb.group({
      username: [null, { updateOn: 'blur', validators: [Validators.required] }],
      email: [null, [Validators.required, Validators.pattern(regex.email), Validators.maxLength(30)]],
      firstName: [null, [Validators.minLength(3), Validators.maxLength(30), Validators.pattern(regex.latinAndSpaces)]],
      lastName: [null, [Validators.minLength(3), Validators.maxLength(30), Validators.pattern(regex.lastName)]],
      roleType: [null, [Validators.required]],
    });
  }

  createChangePasswordForm(): FormGroup {
    return this.fb.group({
      currentPassword: [[], {
        validators: [Validators.required]
      }],
      newPassword: [[], {
        validators: [Validators.required, Validators.pattern(regex.password)]
      }],
      confirmationPassword: [[], {
        validators: [Validators.compose([Validators.required])]
      }],
    })
  }
}
