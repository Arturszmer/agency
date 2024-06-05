import {Component, OnInit} from '@angular/core';
import {MatProgressBar} from "@angular/material/progress-bar";
import {AsyncPipe, NgIf} from "@angular/common";
import {UserControllerService} from "@app/service/api/services/user-controller.service";
import {ShowMessageService} from "@app/service/show-messages/show-message.service";
import {TranslateModule} from "@ngx-translate/core";
import {UserDetailsDto} from "@app/service/api/models/user-details";
import {DateComponent} from "@app/shared/controls/date/date.component";
import {FormFieldComponent} from "@app/shared/controls/form-field/form-field.component";
import {InputComponent} from "@app/shared/controls/input/input.component";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {UserFormService} from "@app/shared/forms/userform/user-form.service";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatDialog} from "@angular/material/dialog";
import {
  ChangePasswordPopupComponent
} from "@app/layout/components/user-details/change-password-popup/change-password-popup.component";
import {ExceptionTranslateService} from "@app/shared/exception/translate/exception-translate.service";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    MatProgressBar,
    NgIf,
    AsyncPipe,
    TranslateModule,
    DateComponent,
    FormFieldComponent,
    InputComponent,
    ReactiveFormsModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {

  userDetailsDto: UserDetailsDto;
  userForm: FormGroup;

  constructor(private userService: UserControllerService,
              private formService: UserFormService,
              private showMessage: ShowMessageService,
              private dialog: MatDialog,
              private translateException: ExceptionTranslateService) {
    this.userForm = this.formService.createUserForm();
  }

  ngOnInit(): void {
    this.userService.userDetails().subscribe({
      next: response => {
        this.userDetailsDto = response;
        this.updateForm(response);
      }, error: (err) => {
        this.showMessage.errorMessage(this.translateException.userException(err))
      }
    })
  }

  onSubmit() {
    this.userService.updateCurrentUserDetails({body: this.userForm.value}).subscribe({
      next: value => {
        this.userDetailsDto = value;
        this.updateForm(value)
      }, error: err => {
        this.showMessage.errorMessage(this.translateException.userException(err))
      }
    })
  }

  editForm() {
    if (this.userForm.enabled) {
      this.updateForm(this.userDetailsDto);
      this.userForm.disable();
    } else {
      this.userForm.enable();
    }
  }

  private updateForm(data: UserDetailsDto): void {
    this.userForm.patchValue({
      username: data.username,
      email: data.email,
      roleType: data.role.roleType,
      firstName: data.firstName,
      lastName: data.lastName
    });
    this.userForm.disable();
  }

  changeUserPassword() {
    this.dialog.open(ChangePasswordPopupComponent, {
      data: this.userDetailsDto.username
    })
  }
}
