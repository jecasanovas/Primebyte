import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Input,
  OnInit,
  Output,
  Self,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css'],
})
export class SelectInputComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input', { static: true }) input!: NgSelectComponent;
  @Input() label!: string;
  @Input() bindId!: String;
  @Input() bindValue!: string;
  @Input() Items!: Array<any>;
  @Input() disabled: boolean = false;
  @Output() changeValue = new EventEmitter();
  @Output() clearValue = new EventEmitter();

  cssfloatlabel: boolean = false;

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;
    const validators = control!.validator ? [control!.validator] : [];
    const asyncValidators = control!.asyncValidator
      ? [control!.asyncValidator]
      : [];

    control!.setValidators(validators);
    control!.setAsyncValidators(asyncValidators);
    control!.updateValueAndValidity();
    this.cssfloatlabel = false;
  }

  onChange(event: any) {
    this.cssfloatlabel = true;
    this.changeValue.emit(event);
  }

  onTouched() {}

  writeValue(obj: any): void {
    this.cssfloatlabel = true;
    this.input.writeValue(obj);
  }

  registerOnChange(fn: any): void {
    this.input.registerOnChange(fn);
  }

  registerOnTouched(fn: any): void {
    this.input.registerOnTouched(fn);
  }
  onClear(event: any) {
    this.clearValue.emit(event);
  }
}
