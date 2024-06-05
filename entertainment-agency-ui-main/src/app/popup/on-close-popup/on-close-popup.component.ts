import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-on-close-popup',
  standalone: true,
  imports: [
    MatDialogContent,
    MatIcon,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    TranslateModule
  ],
  templateUrl: './on-close-popup.component.html',
  styleUrl: './on-close-popup.component.scss'
})
export class OnClosePopupComponent {

  constructor(public dialogRef: MatDialogRef<OnClosePopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) {
  }
}
