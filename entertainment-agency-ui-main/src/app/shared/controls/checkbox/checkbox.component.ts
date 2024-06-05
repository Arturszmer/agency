import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ControlItem, Value} from "@app/models/frontend/control-item";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [
    NgForOf
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent implements OnInit, ControlValueAccessor{

  @Input() items: ControlItem[];
  @Output() changed: EventEmitter<Value[]> = new EventEmitter<Value[]>();

  value: Value[];
  isDisabled: boolean;

  constructor() { }

  ngOnInit(): void {
  }
  private propagateChange: any = () => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: Value[]): void {
  }

  onChanged(value: Value, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const selected = this.getSelected(value, checked)
    this.value = selected;
    this.propagateChange(selected);
    this.changed.emit(selected);

  }

  private getSelected(value: Value, checked: boolean): Value[] {
    const selected: Value[] = this.value ?[...this.value] : [];
    if(checked){
      if(!selected.includes(value)){
        selected.push(value)
      }
    } else {
      const index = selected.indexOf(value);
      selected.splice(index, 1);
    }
    return selected.length ? selected : null;
  }

  isChecked(value: Value):boolean{
    return this.value && this.value.includes(value);
  }
}
