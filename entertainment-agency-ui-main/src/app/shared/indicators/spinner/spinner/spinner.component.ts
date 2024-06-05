import { Component } from '@angular/core';
import {MatProgressSpinner, ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [
    MatProgressSpinner
  ],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';

}
