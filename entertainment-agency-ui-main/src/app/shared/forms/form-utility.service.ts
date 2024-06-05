import { Injectable } from '@angular/core';
import {ShowMessageService} from "@app/service/show-messages/show-message.service";
import {MatDialog} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {OnClosePopupComponent} from "@app/popup/on-close-popup/on-close-popup.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormUtilityService {

  constructor(
    private showMessageService: ShowMessageService,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {}

  showMessage(messageKey: string, params?: any): void {
    const message = this.translate.instant(messageKey, params);
    this.showMessageService.message(message);
  }

  openDialog(dialogMessageKey: string): Observable<boolean> {
    const dialogRef = this.dialog.open(OnClosePopupComponent, {
      data: this.translate.instant(dialogMessageKey)
    });

    return dialogRef.afterClosed();
  }
}
