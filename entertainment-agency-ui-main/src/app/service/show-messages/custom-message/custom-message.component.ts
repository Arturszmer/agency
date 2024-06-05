import {Component, inject} from '@angular/core';
import {MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef} from "@angular/material/snack-bar";
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-custom-message',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatSnackBarLabel,
    MatButton,
    MatSnackBarActions,
    MatSnackBarAction
  ],
  templateUrl: './custom-message.component.html',
  styleUrl: './custom-message.component.scss'
})
export class CustomMessageComponent {
  snackBarRef = inject(MatSnackBarRef);
}
