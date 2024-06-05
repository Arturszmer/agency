import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor{

  @Input() placeholder: string;
  @Input() isReadonly: boolean;
  @Output() changed: EventEmitter<string> = new EventEmitter<string>();

  value: string;
  isDisabled: boolean;
  @Input() inputClass: string = 'hp-input';

  constructor() { }

  ngOnInit(): void {
  }

  private propagateChange: any = () => { };
  private propagateTouched: any = () => { };

  registerOnChange( fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  onKeyup(event: any): void {
    const value: string = (event as HTMLInputElement).value;

    const trimmedValue = value.trim()
    this.value = trimmedValue;
    this.propagateChange(trimmedValue);
    this.changed.emit(trimmedValue);
  }

  onBLur(): void {
    this.propagateTouched();
  }

}
