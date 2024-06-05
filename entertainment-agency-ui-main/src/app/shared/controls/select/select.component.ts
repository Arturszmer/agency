import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {MatOption, MatSelect, MatSelectChange} from "@angular/material/select";
import {ControlItem, Value} from "@app/models/frontend/control-item";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    MatSelect,
    MatOption,
    NgForOf
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {

  @Input() items: ControlItem[];
  @Input() placeholder: string;
  @Output() changed: EventEmitter<Value> = new EventEmitter<Value>();

  value: Value;
  isDisabled: boolean;

  constructor() { }

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

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: Value): void {
    this.value = value;
  }

  onChanged(event: MatSelectChange): void {
    const value = event.value ? event.value : null;
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }

  onBLur(): void {
    this.propagateTouched();
  }

}
