import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ContractorSearchControllerService} from "@app/service/api/services/contractor-search-controller.service";
import {AutocompleteComponent} from "@app/shared/controls/autocomplete/autocomplete.component";
import {DateComponent} from "@app/shared/controls/date/date.component";
import {FormFieldComponent} from "@app/shared/controls/form-field/form-field.component";
import {InputComponent} from "@app/shared/controls/input/input.component";
import {MatDivider} from "@angular/material/divider";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TextAreaComponent} from "@app/shared/controls/text-area/text-area.component";
import {regexErrors} from "@app/shared/utils";
import {ContractorDto} from "@app/service/api/models/contractor-dto";
import {voivodeships} from "@app/models/voivodeships";
import {ContractorControllerService} from "@app/service/api/services/contractor-controller.service";
import {ShowMessageService} from "@app/service/show-messages/show-message.service";
import {MatDialog} from "@angular/material/dialog";
import {OnClosePopupComponent} from "@app/popup/on-close-popup/on-close-popup.component";
import {ContractorFormService} from "@app/shared/forms/contractorform/contractor-form.service";
import {CanComponentDeactivate, stopEditingForm} from "@app/guard/unsaved-changes.guard";
import {Observable} from 'rxjs';
import {extractBirthDateFromPesel} from "@app/service/api/fn/pesel/birthday-from-pesel";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-contractor-details',
  standalone: true,
  imports: [
    AutocompleteComponent,
    DateComponent,
    FormFieldComponent,
    InputComponent,
    MatDivider,
    ReactiveFormsModule,
    TextAreaComponent,
    TranslateModule
  ],
  templateUrl: './contractor-details.component.html',
  styleUrl: './contractor-details.component.scss'
})
export class ContractorDetailsComponent implements OnInit, CanComponentDeactivate {

  contractorForm: FormGroup;
  contractorDetails: ContractorDto;
  publicId: string;

  constructor(private contractorFormService: ContractorFormService,
              private activeRouter: ActivatedRoute,
              private contractorSearchService: ContractorSearchControllerService,
              private contractorService: ContractorControllerService,
              private showMessage: ShowMessageService,
              private dialog: MatDialog,
              private router: Router,
              private translate: TranslateService) {
    this.contractorForm = this.contractorFormService.createContractorForm();
  }

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe(params => {
      this.publicId = params.get('id')
      if (this.publicId) {
        this.contractorSearchService.getContractorDetails({'public-id': this.publicId}).subscribe({
          next: response => {
            this.contractorDetails = response;
            this.updateForm(response);
            this.activeRouter.queryParams.subscribe(queryParams => {
              if (queryParams['editMode']) {
                this.contractorForm.enable();
              } else {
                this.contractorForm.disable();
              }
            })
          }
        })
      }
    });
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

  onSubmit() {
    if (this.contractorForm.invalid) {
      this.contractorForm.markAllAsTouched()
      return;
    }
    this.submitDialog();
  }

  delete() {
    this.deleteDialog();
  }

  backToContractors() {
    if (this.contractorForm.enabled) {
      const dialogRef = this.dialog.open(OnClosePopupComponent, {
        data: this.translate.instant('popupCloseMessages.onExitFromContractorEditing')
      })
      dialogRef.afterClosed().subscribe({
        next: value => {
          if (value) {
            this.router.navigate(['hr/contractor'])
          }
        }
      })
    } else {
      this.router.navigate(['hr/contractor'])
    }
  }

  editForm() {
    if (this.contractorForm.enabled) {
      this.updateForm(this.contractorDetails);
      this.contractorForm.disable();
    } else {
      this.contractorForm.enable();
    }
  }

  private submitDialog() {
    const dialogRef = this.dialog.open(OnClosePopupComponent, {
      data: this.translate.instant('popupCloseMessages.onSubmitEditContractor')
    })
    dialogRef.afterClosed().subscribe({
      next: value => {
        if (value) {
          this.sendRequestWithChanges();
        }
      }, error: (err) => {
        this.showMessage.message(err.error.message)
      }
    })
  }

  private deleteDialog() {

    const dialogRef = this.dialog.open(OnClosePopupComponent, {
      data: this.translate.instant('popupCloseMessages.onDeleteContractor')
    })
    dialogRef.afterClosed().subscribe({
      next: value => {
        if (value) {
          this.sendRequestToDelete();
        }
      }, error: (err) => {
        this.showMessage.message(err.error.message)
      }
    })
  }

  private sendRequestToDelete() {
    this.contractorService.delete({'public-id': this.publicId}).subscribe({
      next: () => {
        this.showMessage.message(this.translate.instant('contractor.contractorDetails.messages.deleteInfo',
          {firstName: this.contractorDetails.name, lastName: this.contractorDetails.lastName}))
        this.router.navigate(['hr/contractor'])
      }, error: (err) => {
        this.showMessage.message(err.error.message)
      }
    })
  }

  private sendRequestWithChanges() {
    this.contractorService.edit({'public-id': this.publicId, body: this.contractorForm.value}).subscribe({
      next: () => {
        this.contractorForm.disable();
        this.showMessage.message(this.translate.instant('contractor.contractorDetails.messages.editInfo',
          {firstName: this.contractorDetails.name, lastName: this.contractorDetails.lastName}));
      }, error: () => {
        this.showMessage.message('Something went wrong, contact with administrator');
      }, complete: () => this.contractorForm.disable()
    })
  }

  private updateForm(data: ContractorDto): void {
    this.contractorForm.patchValue({
      firstName: data.name,
      lastName: data.lastName,
      pesel: data.pesel,
      birthDate: data.birthDate,
      phone: data.phone,
      email: data.email,
      addressDto: {
        city: data.addressDto.city,
        voivodeship: data.addressDto.voivodeship,
        zipCode: data.addressDto.zipCode,
        street: data.addressDto.street,
        houseNumber: data.addressDto.houseNumber,
        apartmentNumber: data.addressDto.apartmentNumber
      },
      contractorDescription: data.contractorDescription
    });
    this.contractorForm.disable();
  }

  protected readonly voivodeships = voivodeships;

  protected readonly regexErrors = regexErrors;
}
