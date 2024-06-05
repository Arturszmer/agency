import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatProgressBar} from "@angular/material/progress-bar";
import {JsonPipe, NgClass, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatTable, MatTableModule} from "@angular/material/table";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MatSidenav} from "@angular/material/sidenav";
import {UserSearchControllerService} from "@app/service/api/services/user-search-controller.service";
import {catchError, merge, Observable, of as observableOf, startWith, switchMap} from "rxjs";
import {GetSortableList$Params} from "@app/service/api/fn/contractor-search-controller/get-contractors-short-info";
import {map} from "rxjs/operators";
import {UserDetailsDto} from "@app/service/api/models/user-details";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {FormFieldComponent} from "@app/shared/controls/form-field/form-field.component";
import {InputComponent} from "@app/shared/controls/input/input.component";
import {AddUserComponent} from "@app/layout/components/users/add-user/add-user.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {OnClosePopupComponent} from "@app/popup/on-close-popup/on-close-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthControllerService} from "@app/service/api/services/auth-controller.service";
import {ShowMessageService} from "@app/service/show-messages/show-message.service";
import {EditUserPopupComponent} from "@app/layout/components/users/edit-user/edit-user-popup.component";
import {CanComponentDeactivate, stopEditingForm} from "@app/guard/unsaved-changes.guard";
import {UserControllerService} from "@app/service/api/services/user-controller.service";
import {ExceptionTranslateService} from "@app/shared/exception/translate/exception-translate.service";
import {DialogUtilityService} from "@app/shared/dialogs/dialog-utility.service";

@Component({
  selector: 'app-users',
  standalone: true,
  animations: [
    trigger('formExpandCollapse', [
      state('collapsed', style({
        height: '0px',
        padding: '0px',
        opacity: 0,
        overflow: 'hidden'
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
    RouterLink,
    MatInput,
    FormFieldComponent,
    InputComponent,
    ReactiveFormsModule,
    TranslateModule,
    AddUserComponent,
    JsonPipe,
    NgClass
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements AfterViewInit, CanComponentDeactivate {

  displayedColumns = ['username', 'email', 'firstName', 'lastName', 'role', 'action'];
  userDetailsDtos: UserDetailsDto[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<UserDetailsDto>;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(AddUserComponent) addUserComponent!: AddUserComponent;

  resultLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  openForm: boolean = false;

  constructor(private userSearchService: UserSearchControllerService,
              private authService: AuthControllerService,
              private userService: UserControllerService,
              private dialog: MatDialog,
              private translate: TranslateService,
              private showMessage: ShowMessageService,
              private translateException: ExceptionTranslateService,
              private dialogUtility: DialogUtilityService) {
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
          return this.userSearchService.getUserDetails(params)
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
      this.userDetailsDtos = data;
    })
  }

  toggleForm(){
    this.openForm = !this.openForm;
  }

  canDeactivate(): Observable<boolean> | boolean {
    return stopEditingForm(this.addUserComponent.userForm);
  }

  addUser() {
    this.toggleForm();
  }

  closeForm() {
    if (this.addUserComponent.userForm.dirty && this.addUserComponent.userForm.enabled) {
      this.onOpenFormDialog()
    } else {
      this.toggleForm();
    }
  }

  close(event: boolean){
    this.toggleForm();
    if (event){
      this.loadUsers()
    }
  }

  editUser(row: UserDetailsDto) {
    const dialogRef = this.dialog.open(EditUserPopupComponent, {
      data: row
    })
    dialogRef.afterClosed().subscribe({
      next: value => {
        if(value){
          this.loadUsers();
        }
      }
    })
  }

  resetPassword(row: UserDetailsDto) {
    this.openDialogWithAction('popupCloseMessages.onResetPassword', () => {
      this.authService.resetPassword({username: row.username}).subscribe({
        next: () => {
          this.showMessage.message('users.actionsResult.passwordReset', {
            username: row.username
          })
        }, error: err => this.showMessage.errorMessage(this.translateException.userException(err.error))
      })
    })
  }

  blockUser(row: UserDetailsDto) {
    this.openDialogWithAction('popupCloseMessages.onBlockUser', () => {
      this.userService.blockUser({ usernameOrEmail: row.username }).subscribe({
        next: () => {
          this.showMessage.message('users.actionsResult.userBlocked',
            { username: row.username });
          this.loadUsers('modificationTimestamp');
        },
        error: err => this.showMessage.errorMessage(this.translateException.userException(err.error))
      });
    }, {username: row.username});
  }

  unBlockUser(row: UserDetailsDto) {
    this.openDialogWithAction('popupCloseMessages.onUnblockUser', () => {
      this.userService.unblockUser({usernameOrEmail: row.username}).subscribe({
        next: () => {
          this.showMessage.message('users.actionsResult.userUnblocked',
            {username: row.username})
          this.loadUsers('modificationTimestamp')
        },
        error: err => this.showMessage.errorMessage(this.translateException.userException(err.error))
      })
    }, {username: row.username})
  }

  private openDialogWithAction(messageKey: string, action: () => void, params?: any) {
    this.dialogUtility.openDialog(messageKey, params).subscribe(value => {
      if (value) {
        action();
      }
    });
  }

  private loadUsers(sortColumn?: string): void {
    const params: GetSortableList$Params = {
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      sort: sortColumn,
      order: 'desc'
    };
    this.userSearchService.getUserDetails(params)
      .pipe(catchError(() => observableOf(null)))
      .subscribe(data => {
        this.isLoadingResults = false;
        this.isRateLimitReached = data === null;

        if (this.isRateLimitReached) {
          this.userDetailsDtos = [];
        } else {
          this.resultLength = data.totalElements;
          this.userDetailsDtos = data.content;
        }
      });
  }

  private onOpenFormDialog() {
    const dialogRef = this.dialog.open(OnClosePopupComponent, {
      data: this.translate.instant('popupCloseMessages.onOpenForm')
    })
    dialogRef.afterClosed().subscribe({
      next: value => {
        if (value) {
          this.addUserComponent.cleanForm();
          this.toggleForm();
        }
      }
    })
  }

}
