import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {FormFieldComponent} from "@app/shared/controls/form-field/form-field.component";
import {InputComponent} from "@app/shared/controls/input/input.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {UserFormService} from "@app/shared/forms/userform/user-form.service";
import {regexErrors} from "@app/shared/utils";
import {PasswordComponent} from "@app/shared/controls/password/password.component";
import {UserControllerService} from "@app/service/api/services/user-controller.service";
import {ShowMessageService} from "@app/service/show-messages/show-message.service";
import {ExceptionTranslateService} from "@app/shared/exception/translate/exception-translate.service";

@Component({
  selector: 'app-change-password-popup',
  standalone: true,
  imports: [
    FormFieldComponent,
    InputComponent,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    ReactiveFormsModule,
    TranslateModule,
    PasswordComponent,
    MatDialogClose
  ],
  templateUrl: './change-password-popup.component.html',
  styleUrl: './change-password-popup.component.scss'
})
export class ChangePasswordPopupComponent {

  changePasswordForm: FormGroup;


  constructor(public dialogRef: MatDialogRef<ChangePasswordPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string,
              private userFormService: UserFormService,
              private userService: UserControllerService,
              private showMessage: ShowMessageService,
              private translateException: ExceptionTranslateService,
              private translate: TranslateService) {
    this.changePasswordForm = this.userFormService.createChangePasswordForm();
  }

  onSubmit(){
    if(this.changePasswordForm.invalid){
      this.changePasswordForm.markAllAsTouched();
      return;
    }
    this.userService.changePassword({body: this.changePasswordForm.value}).subscribe({
      next: () => {
        this.showMessage.message(this.translate.instant("userDetails.userChangePasswordPopup.onSuccess"))
        this.dialogRef.close()
      }, error: err => {
        this.showMessage.message(this.translateException.userException(err.error))
      }
    })
  }

  protected readonly regexErrors = regexErrors;
}
