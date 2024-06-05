import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true
    }
  ]
})
export class TextAreaComponent implements OnInit, ControlValueAccessor{
    @Input() placeholder: string;

  @Output() changed: EventEmitter<string> = new EventEmitter<string>();
    value: string;

  isDisabled: boolean;
  @Input() inputClass: string = 'hp-input_textarea';

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
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }

  onBLur(): void {
    this.propagateTouched();
  }

}
