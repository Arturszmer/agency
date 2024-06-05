import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {NgIf, NgSwitch, NgSwitchCase} from "@angular/common";

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgIf
  ],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent implements OnInit {

  @Input() label: string;
  @Input() required: boolean;
  @Input() isInline: boolean;
  @Input() control: AbstractControl;
  @Input() patternError: string;

  constructor() {
    this.isInline = true;
  }

  ngOnInit(): void {
  }

  hasError(): boolean {
    return this.control && this.control.invalid && this.control.touched;
  }

  get errorKey(){
    return this.control && this.control.errors && Object.keys(this.control.errors)[0]; // zwracam tylko pierwszy error

  }

}
