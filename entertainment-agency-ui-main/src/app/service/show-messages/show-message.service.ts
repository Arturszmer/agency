import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomMessageComponent} from "@app/service/show-messages/custom-message/custom-message.component";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class ShowMessageService {

  constructor(private snackBar: MatSnackBar,
              private translate: TranslateService) { }

  public message(message: string, params?: any) {
    this.snackBar.open(this.translate.instant(message, params), 'Close', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  public errorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  public showBasicNotification(){
    this.snackBar.openFromComponent(CustomMessageComponent)
  }
}
