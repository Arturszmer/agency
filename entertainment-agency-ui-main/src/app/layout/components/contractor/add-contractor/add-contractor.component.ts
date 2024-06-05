import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {FormFieldComponent} from "@app/shared/controls/form-field/form-field.component";
import {InputComponent} from "@app/shared/controls/input/input.component";
import {regexErrors} from "@app/shared/utils";
import {DateComponent} from "@app/shared/controls/date/date.component";
import {AutocompleteComponent} from "@app/shared/controls/autocomplete/autocomplete.component";
import {voivodeships} from "@app/models/voivodeships";
import {MatDivider} from "@angular/material/divider";
import {ContractorControllerService} from "@app/service/api/services/contractor-controller.service";
import {ShowMessageService} from "@app/service/show-messages/show-message.service";
import {TextAreaComponent} from "@app/shared/controls/text-area/text-area.component";
import {ContractorFormService} from "@app/shared/forms/contractorform/contractor-form.service";
import {CanComponentDeactivate, stopEditingForm} from "@app/guard/unsaved-changes.guard";
import {Observable} from 'rxjs';
import {extractBirthDateFromPesel} from "@app/service/api/fn/pesel/birthday-from-pesel";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {FormUtilityService} from "@app/shared/forms/form-utility.service";

@Component({
  selector: 'app-add-contractor',
  templateUrl: './add-contractor.component.html',
  styleUrl: './add-contractor.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    FormFieldComponent,
    InputComponent,
    DateComponent,
    AutocompleteComponent,
    MatDivider,
    TextAreaComponent,
    TranslateModule
  ]
})
export class AddContractorComponent implements OnInit, CanComponentDeactivate {

  @Output() closeForm = new EventEmitter<boolean>();
  contractorForm: FormGroup;

  constructor(private contractorService: ContractorControllerService,
              private showMessage: ShowMessageService,
              private contractorFormService: ContractorFormService,
              private formUtility: FormUtilityService,
              private translate: TranslateService) {
    this.contractorForm = this.contractorFormService.createContractorForm();
  }

  ngOnInit(): void {
    this.contractorForm.get('pesel').valueChanges.subscribe(pesel => {
      const birthDate = extractBirthDateFromPesel(pesel);
      if (birthDate) {
        this.contractorForm.get('birthDate').setValue(birthDate);
      }
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    return stopEditingForm(this.contractorForm);
  }

  onSubmit(): void {
    if (this.contractorForm.invalid) {
      this.contractorForm.markAllAsTouched()
      return;
    }

    this.contractorService.add({body: this.contractorForm.value}).subscribe({
      next: (resp) => {
        this.showMessage.message(this.translate.instant('contractor.addContractor.addInfo',
          {firstName: resp.name, lastName: resp.lastName}));
        this.onClose(false);
      }, error: (err) => {
        this.showMessage.message(err.error.message);
      }
    })
  }

  cleanForm() {
    this.contractorForm.reset()
  }

  onClose(withDialog: boolean) {

    if (withDialog && (this.contractorForm.dirty && this.contractorForm.enabled)) {
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

  protected readonly regexErrors = regexErrors;

  protected readonly voivodeships = voivodeships;
}
