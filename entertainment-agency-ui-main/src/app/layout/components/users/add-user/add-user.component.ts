import {Component, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShowMessageService} from "@app/service/show-messages/show-message.service";
import {UserFormService} from "@app/shared/forms/userform/user-form.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {AutocompleteComponent} from "@app/shared/controls/autocomplete/autocomplete.component";
import {DateComponent} from "@app/shared/controls/date/date.component";
import {FormFieldComponent} from "@app/shared/controls/form-field/form-field.component";
import {InputComponent} from "@app/shared/controls/input/input.component";
import {MatDivider} from "@angular/material/divider";
import {TextAreaComponent} from "@app/shared/controls/text-area/text-area.component";
import {roles} from "@app/service/api/models/user-details";
import {regexErrors} from "@app/shared/utils";
import {AuthControllerService} from "@app/service/api/services/auth-controller.service";
import {FormUtilityService} from "@app/shared/forms/form-utility.service";
import {ExceptionTranslateService} from "@app/shared/exception/translate/exception-translate.service";

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    AutocompleteComponent,
    DateComponent,
    FormFieldComponent,
    FormsModule,
    InputComponent,
    MatDivider,
    ReactiveFormsModule,
    TextAreaComponent,
    TranslateModule
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {

  @Output() closeForm = new EventEmitter<boolean>();
  userForm: FormGroup;

  constructor(private userService: AuthControllerService,
              private showMessage: ShowMessageService,
              private userFormService: UserFormService,
              private formUtility: FormUtilityService,
              private translate: TranslateService,
              private translateException: ExceptionTranslateService) {
    this.userForm = this.userFormService.createUserForm()
  }

  onSubmit() {
    if(this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.userService.register({body: this.userForm.value}).subscribe({
      next: resp => {
        this.showMessage.message(this.translate.instant('users.addUser.addInfo', {username: resp.username}))
        this.onClose(false);
      }, error: err => this.showMessage.errorMessage(this.translateException.userException(err.error))
    })

  }

  onClose(withDialog: boolean) {
    if (withDialog && (this.userForm.dirty && this.userForm.enabled)) {
      this.formUtility.openDialog('popupCloseMessages.onOpenForm').subscribe(value => {
        if (value) {
          this.cleanForm();
          this.closeForm.emit(false);
        }
      });
    } else {
      this.cleanForm();
      this.closeForm.emit(true);
    }

  }

  cleanForm() {
    this.userForm.reset();
  }

  protected readonly roles = roles;
  protected readonly regexErrors = regexErrors;
}
