import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs";
import {OnClosePopupComponent} from "@app/popup/on-close-popup/on-close-popup.component";

@Injectable({
  providedIn: 'root'
})
export class DialogUtilityService {

  constructor(private dialog: MatDialog,
              private translate: TranslateService) {}

  openDialog(messageKey: string, params?: any): Observable<boolean> {
    const dialogRef = this.dialog.open(OnClosePopupComponent, {
      data: this.translate.instant(messageKey, params)
    });

    return dialogRef.afterClosed();
  }
}
