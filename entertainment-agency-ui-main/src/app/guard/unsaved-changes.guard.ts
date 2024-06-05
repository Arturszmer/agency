import {CanDeactivateFn} from '@angular/router';
import {Observable, of, switchMap} from "rxjs";
import {inject} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {OnClosePopupComponent} from "@app/popup/on-close-popup/on-close-popup.component";
import {FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component, currentRoute, currentState, nextState) => {
  inject(MatDialog);

  if (component.canDeactivate) {
    const canDeactivate = component.canDeactivate();
    if (typeof canDeactivate === 'boolean') {
      return canDeactivate;
    } else if (canDeactivate instanceof Observable) {
      return canDeactivate;
    } else {
      return new Promise<boolean>((resolve) => {
        canDeactivate.then(resolve);
      });
    }
  }
  return true;
};

export function stopEditingForm(contractorForm: FormGroup): Observable<boolean> {
  const dialog = inject(MatDialog);
  const translate = inject(TranslateService);

  if (contractorForm.touched && contractorForm.enabled) {
    const dialogRef = dialog.open(OnClosePopupComponent, {
      data: translate.instant('popupCloseMessages.onExitFromContractorEditing')
    });

    return dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (result) {
          return of(true);
        } else {
          return of(false);
        }
      })
    );
  }
  return of(true)

}
