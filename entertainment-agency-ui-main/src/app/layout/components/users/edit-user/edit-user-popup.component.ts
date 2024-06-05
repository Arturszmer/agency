import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {roles, UserDetailsDto} from "@app/service/api/models/user-details";
import {UserFormService} from "@app/shared/forms/userform/user-form.service";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FormFieldComponent} from "@app/shared/controls/form-field/form-field.component";
import {PasswordComponent} from "@app/shared/controls/password/password.component";
import {TranslateModule} from "@ngx-translate/core";
import {InputComponent} from "@app/shared/controls/input/input.component";
import {regexErrors} from "@app/shared/utils";
import {AutocompleteComponent} from "@app/shared/controls/autocomplete/autocomplete.component";
import {UserControllerService} from "@app/service/api/services/user-controller.service";
import {ShowMessageService} from "@app/service/show-messages/show-message.service";
import {ExceptionTranslateService} from "@app/shared/exception/translate/exception-translate.service";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    ReactiveFormsModule,
    FormFieldComponent,
    PasswordComponent,
    TranslateModule,
    InputComponent,
    AutocompleteComponent,
    MatDialogClose,
    MatCardTitle
  ],
  templateUrl: './edit-user-popup.component.html',
  styleUrl: './edit-user-popup.component.scss'
})
export class EditUserPopupComponent implements OnInit {

  editUserForm: FormGroup;
  private _currentUsername: string;

  constructor(public dialogRef: MatDialogRef<EditUserPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UserDetailsDto,
              private userFormService: UserFormService,
              private userService: UserControllerService,
              private showMessage: ShowMessageService,
              private translateException: ExceptionTranslateService) {
    this.editUserForm = this.userFormService.createUserForm();
  }

  ngOnInit(): void {
    this.updateUserData(this.data);
    this._currentUsername = this.data.username;
  }


  private updateUserData(data: UserDetailsDto) {
    this.editUserForm.patchValue({
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      roleType: data.role.roleType
    })
  }

  onSubmit() {
    if(this.editUserForm.invalid) {
      this.editUserForm.markAllAsTouched();
      return;
    }

    this.userService.updateUserDetails({body: this.editUserForm.value, username: this._currentUsername }).subscribe({
      next: resp => {
        this.showMessage.message("userDetails.userChangePasswordPopup.onSuccess", resp.username)
        this.dialogRef.close(true);
      }, error: err => this.showMessage.errorMessage(this.translateException.userException(err.error))
    })

  }

  protected readonly roles = roles;
  protected readonly regexErrors = regexErrors;
}
