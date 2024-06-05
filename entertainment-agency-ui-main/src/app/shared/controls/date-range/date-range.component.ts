import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {DateComponent} from "@app/shared/controls/date/date.component";

export interface Value {
  from: number;
  to: number;
}

export interface Placeholder {
  from: string;
  to: string;
}

@Component({
  selector: 'app-date-range',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DateComponent
  ],
  templateUrl: './date-range.component.html',
  styleUrl: './date-range.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangeComponent),
      multi: true
    }
  ]
})
export class DateRangeComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder: Placeholder;
  @Output() changed: EventEmitter<Value> = new EventEmitter<Value>();

  form: FormGroup;

  value: Value;
  isDisabled: boolean;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      from: [null],
      to: [null]
    });
  }

  get min(): Date {
    const from = this.form.controls['from'].value;
    return from ? new Date(from) : null;
  }
  get max(): Date {
    const to = this.form.controls['to'].value;
    return to ? new Date(to) : null;
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
    isDisabled ? this.form.disabled : this.form.enabled;
  }

  writeValue(value: Value): void {
    this.form.patchValue(value || {})
  }

  onChanged(): void {
    const value = {...this.form.value};

    this.propagateChange(value);
    this.changed.emit(value);
  }
  onClosed(): void {
    this.propagateTouched()
  }

}
