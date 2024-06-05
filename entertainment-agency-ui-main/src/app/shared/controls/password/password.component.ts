import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";

type PasswordType = 'password' | 'text';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true
    }
  ]
})
export class PasswordComponent implements OnInit, ControlValueAccessor{

  @Input() placeholder: string;
  @Output() changed: EventEmitter<string> = new EventEmitter<string>();
  @Input() inputClass: string = 'hp-input';

  value: string;
  isDisabled: boolean;
  passwordType: PasswordType;

  constructor() {
    this.passwordType = 'password';
  }

  ngOnInit(): void {
  }

  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  onKeyup(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }

  onBLur(): void {
    this.propagateTouched();
  }

  togglePassword(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

}
