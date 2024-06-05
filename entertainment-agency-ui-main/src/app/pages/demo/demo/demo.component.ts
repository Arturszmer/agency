import { Component } from '@angular/core';
import {ButtonComponent} from "@app/shared/buttons/button/button.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormFieldComponent} from "@app/shared/controls/form-field/form-field.component";
import {InputComponent} from "@app/shared/controls/input/input.component";
import {PasswordComponent} from "@app/shared/controls/password/password.component";
import {SelectComponent} from "@app/shared/controls/select/select.component";
import {AutocompleteComponent} from "@app/shared/controls/autocomplete/autocomplete.component";
import {CheckboxComponent} from "@app/shared/controls/checkbox/checkbox.component";
import {RadiosComponent} from "@app/shared/controls/radios/radios.component";
import {DateComponent} from "@app/shared/controls/date/date.component";
import {DateRangeComponent} from "@app/shared/controls/date-range/date-range.component";
import {ControlItem} from "@app/models/frontend/control-item";
import {markFormGroupToched, regex, regexErrors} from "@app/shared/utils";
import {SpinnerComponent} from "@app/shared/indicators/spinner/spinner/spinner.component";
import {JsonPipe, NgIf} from "@angular/common";
import {ShowMessageService} from "@app/service/show-messages/show-message.service";

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    FormFieldComponent,
    InputComponent,
    PasswordComponent,
    SelectComponent,
    AutocompleteComponent,
    CheckboxComponent,
    RadiosComponent,
    DateComponent,
    DateRangeComponent,
    SpinnerComponent,
    NgIf,
    JsonPipe
  ],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss'
})
export class DemoComponent {

  form: FormGroup;
  isInline: boolean;
  regexErrors = regexErrors;

  items: ControlItem[];

  showSpinner: boolean = false;

  constructor(private fb: FormBuilder, private showMessage: ShowMessageService) {
    this.isInline = true;
    this.items = [
      {
        label: 'first', value: 1
      },
      {
        label: 'second', value: 2
      },
      {
        label: 'third', value: 3
      },
      {
        label: 'fourth', value: 4
      },
    ];
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      input: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(regex.email)
        ]
      }],
      password: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
        ]
      }],
      autocomplete: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }],
      select: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }],
      checkbox: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }],
      radios: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }],
      date: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }],
      dateRange: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }],
    })
  }

  onPatchValue(): void{
    this.form.patchValue({
      input: 'test',
      password: 'qwerty',
      autocomplete: 1,
      select: 2,
      checkboxes: [3],
      radios: 4,
      date: new Date().getTime(),
      dateRange: {
        from: new Date(2019,5,10).getTime(),
        to: new Date(2019,5,25).getTime()
      }
    });
  }

  onToggleInline(): void{
    this.isInline = !this.isInline;
  }

  onSubmit(): void {
    if(this.form.invalid){
      markFormGroupToched(this.form);
    }
  }

  onToggleDisable(): void {
    if(this.form.enabled){
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  onToggleSpinner() {
    this.showSpinner = !this.showSpinner;
  }

  onError() {
    this.showMessage.message('Something went wrong!')
  }

  onSuccess() {
    this.showMessage.message('All Right!')
  }

  onShowMessage(){
    this.showMessage.showBasicNotification()
  }

}
