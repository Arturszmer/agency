import {Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {map, filter, Observable, startWith, Subject, takeUntil, distinctUntilChanged} from "rxjs";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {ControlItem, Value} from "@app/models/frontend/control-item";
import {HighlightPipe} from "@app/shared/controls/autocomplete/pipes/Highlight.pipe";

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    NgClass,
    MatOption,
    HighlightPipe,
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() items: ControlItem[];
  @Input() placeholder: string;
  @Output() changed: EventEmitter<Value> = new EventEmitter<Value>();

  formControl = new FormControl();

  options$: Observable<ControlItem[]>;

  private destroy_ = new Subject<any>()

  constructor() { }

  ngOnInit(): void {
    this.options$ = this.formControl.valueChanges.pipe(
      startWith(''),
      filter((value) => {
        return typeof value === "string" || typeof value === 'object';
      }),
      map(value => typeof value === 'string' ? value : value.label),
      map(label => typeof label ? this.filter(label) : this.items.slice()),
    )
    this.formControl.valueChanges.pipe(
      takeUntil(this.destroy_),
      distinctUntilChanged()
    ).subscribe(item =>{
      const value = typeof item === 'object' ? item.value : null;
      this.propagateChange(value);
      this.changed.emit(value);
    })
  }

  ngOnDestroy(): void {
    this.destroy_.next(this.options$);
    this.destroy_.complete();
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
    if(isDisabled){
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  writeValue(value: Value): void {
    const selectedOption = this.items.find(item => item.value === value);
    this.formControl.setValue(selectedOption);
  }

  private filter(value: string): ControlItem[] {
    const filterValue = value.toLowerCase();
    return this.items.filter(item => item.label.toLowerCase().includes(filterValue));
  }

  displayFn(item?: ControlItem): string | undefined {
    return item ? item.label : undefined;
  }

  onBlur(): void {
    this.propagateTouched();
  }

}
