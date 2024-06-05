import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormFieldComponent} from "@app/shared/controls/form-field/form-field.component";
import {InputComponent} from "@app/shared/controls/input/input.component";
import {PasswordComponent} from "@app/shared/controls/password/password.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {StartPageComponent} from "@app/pages/start/start-page/start-page.component";
import {LoginComponent} from "@app/pages/start/start-page/login/login.component";
import {InitializeComponent} from "@app/pages/start/start-page/initialize/initialize.component";
import {TranslateModule} from "@ngx-translate/core";
import {MatIcon} from "@angular/material/icon";

@NgModule({
  declarations: [
    StartPageComponent,
    LoginComponent,
    InitializeComponent],
  imports: [
    CommonModule,
    MatFormField,
    MatSelect,
    MatOption,
    FormFieldComponent,
    InputComponent,
    PasswordComponent,
    ReactiveFormsModule,
    NgOptimizedImage,
    MatSnackBarModule,
    TranslateModule,
    MatIcon
  ],
  exports:[
    StartPageComponent,
    LoginComponent,
    InitializeComponent],
  providers: [
  ]

})
export class StartPageModule { }
