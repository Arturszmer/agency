import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { MatDatepicker, MatDatepickerInput, MatDatepickerInputEvent, MatDatepickerToggle } from "@angular/material/datepicker";
import {MatHint, MatSuffix} from "@angular/material/form-field";
import moment, { Moment } from 'moment';

// const myMoment = _rollupMoment || moment;

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatSuffix,
    ReactiveFormsModule,
    MatHint
  ],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder: string;
  @Input() min: Date;
  @Input() max: Date;
  @Output() changed: EventEmitter<string> = new EventEmitter<string>();
  @Output() closed: EventEmitter<void> = new EventEmitter<void>();

  value = new FormControl<Moment | null>(null)
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
    if (isDisabled) {
      this.value.disable();
    } else {
      this.value.enable();
    }
  }

  writeValue(value: string): void {
    if (value) {
      this.value.setValue(moment(value));
    } else {
      this.value.setValue(null);
    }
  }

  onChange(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      const isoDate = event.value.toISOString().split('T')[0];
      this.propagateChange(isoDate);
      this.changed.emit(isoDate);
    } else {
      this.propagateChange(null);
      this.changed.emit(null);
    }
  }

  onClosed(): void {
    this.propagateTouched()
    this.closed.emit()
  }

}
