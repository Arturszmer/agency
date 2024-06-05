import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {ShortContractorDto} from "@app/service/api/models/short-contractor-dto";
import {ContractorSearchControllerService} from "@app/service/api/services/contractor-search-controller.service";
import {catchError, merge, Observable, of as observableOf, startWith, switchMap} from "rxjs";
import {
  GetSortableList$Params
} from "@app/service/api/fn/contractor-search-controller/get-contractors-short-info";
import {map} from "rxjs/operators";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatProgressBar} from "@angular/material/progress-bar";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {MatDivider} from "@angular/material/divider";
import {MatSidenav} from "@angular/material/sidenav";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddContractorComponent} from "@app/layout/components/contractor/add-contractor/add-contractor.component";
import {MatDialog} from "@angular/material/dialog";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Router, RouterLink} from "@angular/router";
import {CanComponentDeactivate, stopEditingForm} from "@app/guard/unsaved-changes.guard";
import {OnClosePopupComponent} from "@app/popup/on-close-popup/on-close-popup.component";
import {MatInput} from "@angular/material/input";
import {FormFieldComponent} from "@app/shared/controls/form-field/form-field.component";
import {InputComponent} from "@app/shared/controls/input/input.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {HasRoleDirective} from "@app/directives/has-role.directive";

@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrl: './contractor.component.scss',
  standalone: true,
  animations: [
    trigger('formExpandCollapse', [
      state('collapsed', style({
        height: '0px',
        padding: '0px',
        opacity: 0,
        display: 'none'
      })),
      state('expanded', style({
        height: '*',
        padding: '*',
        opacity: 1
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinner,
    MatProgressBar,
    NgIf,
    MatButton,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatIcon,
    MatDivider,
    MatSidenav,
    MatFormField,
    MatLabel,
    FormsModule,
    AddContractorComponent,
    RouterLink,
    MatInput,
    FormFieldComponent,
    InputComponent,
    ReactiveFormsModule,
    TranslateModule,
    HasRoleDirective
  ]
})
export class ContractorComponent implements AfterViewInit, CanComponentDeactivate {

  displayedColumns = ['firstName', 'lastName', 'email', 'phone', 'action'];
  contractorsDto: ShortContractorDto[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ShortContractorDto>;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(AddContractorComponent) addContractorComponent!: AddContractorComponent;

  resultLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  openForm: boolean = false;

  constructor(private contractorSearchService: ContractorSearchControllerService,
              private dialog: MatDialog,
              private router: Router,
              private translate: TranslateService) {
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const params: GetSortableList$Params =
            {
              page: this.paginator.pageIndex,
              size: this.paginator.pageSize,
              sort: this.sort.active,
              order: this.sort.direction ? this.sort.direction : 'asc'
            }
          return this.contractorSearchService.getContractorsShortInfo(params)
            .pipe(catchError(() => observableOf(null)))
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (this.isRateLimitReached) {
            return [];
          }
          this.resultLength = data.totalElements;
          return data.content;

        })
      ).subscribe(data => {
      this.contractorsDto = data;
    })
  }

  canDeactivate(): Observable<boolean> | boolean {
    return stopEditingForm(this.addContractorComponent.contractorForm);
  }

  detailsContractor(contractor: ShortContractorDto): void {
    if (contractor) {
      const id = contractor.publicId;
      if (id) {
        this.router.navigate(['hr/contractor/details', id]);
      } else {
        this.router.navigate(['/not-found'])
      }
    }
  }

  updateContractor(contractor: ShortContractorDto): void {
    if (contractor) {
      const id = contractor.publicId;
      if (id) {
        this.router.navigate(['hr/contractor/details', id], { queryParams: { editMode: true }});
      } else {
        this.router.navigate(['/not-found'])
      }
    }
  }

  // Method to handle assigning a contractor to a project
  assignToProject(contractor: ShortContractorDto): void {
    // Implement your assign to project logic here
    console.log('Assign contractor to project:', contractor);
    // For example, you might open a dialog to select a project
  }

  addContractor() {
    return this.openForm = !this.openForm
  }

  closeForm() {
    if (this.addContractorComponent.contractorForm.dirty && this.addContractorComponent.contractorForm.enabled) {
      this.openDialog()
    } else {
      this.openForm = false;
    }
  }

  close(isAddedNewContractor: boolean) {
    this.openForm = !this.openForm;
    if (isAddedNewContractor) {
      this.loadContractors('modificationTimestamp');
    }
  }


  applyFilter($event: KeyboardEvent) {
    console.log($event)
    //todo: TO IMPLEMENT
    // const filterValue = (event.target as HTMLInputElement).value;

    // this.dataSource.filter = filterValue.trim().toLowerCase();
    //
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  private loadContractors(sortColumn?: string): void {
    const params: GetSortableList$Params = {
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      sort: sortColumn,
      order: 'desc'
    };
    this.contractorSearchService.getContractorsShortInfo(params)
      .pipe(catchError(() => observableOf(null)))
      .subscribe(data => {
        this.isLoadingResults = false;
        this.isRateLimitReached = data === null;

        if (this.isRateLimitReached) {
          this.contractorsDto = [];
        } else {
          this.resultLength = data.totalElements;
          this.contractorsDto = data.content;
        }
      });
  }

  private openDialog() {
    const dialogRef = this.dialog.open(OnClosePopupComponent, {
      data: this.translate.instant('popupCloseMessages.onOpenForm')
    })
    dialogRef.afterClosed().subscribe({
      next: value => {
        if (value) {
          this.addContractorComponent.cleanForm();
          this.openForm = false;
        }
      }
    })
  }

  protected readonly event = event;
}
