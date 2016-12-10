import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

let accessor = forwardRef(() => CounterInputComponent)
let validator = (control: FormControl) => {
  const val = control.value
  if (val >= 0 && val <= 10) return null;
  return { rangeError: { given: val, min: 0, max: 10 } };
};

@Component({
  selector: 'counter-input',
  template: `
    <button (click)="decrement()">-</button>
    {{value}}
    <button (click)="increment()">+</button>
  `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: accessor, multi: true },
    { provide: NG_VALIDATORS, useValue: validator, multi: true }
  ]
})
export class CounterInputComponent implements ControlValueAccessor {

  private _value = 0;

  private propagateChange = (_: any) => {};
  private propagateTouched = (_: any) => {};

  get value() {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
    this.propagateChange(value);
  }

  increment() {
    this.value++;
  }

  decrement() {
    this.value--;
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this.propagateTouched = fn;
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.value = value;
    }
  }
}
