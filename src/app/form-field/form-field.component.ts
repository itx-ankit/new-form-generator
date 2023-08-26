import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFormField, IItem } from '../Interface/IFormData';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class FormFieldComponent implements OnInit {
  @Input() formData: IFormField[] | undefined;
  @Input() submitButtonText: string | undefined;
  @Output() formGroupEvent: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  formGroup!: FormGroup;

  ngOnInit(): void {
    this.setupFormControl();
  }

  setupFormControl() {
    const formControls: any = {};
    if (this.formData?.length) {
      this.formData.forEach((form: IFormField) => {
        let formValue: (string | number)[] | string | number = '';
        if (Array.isArray(form.items) && form.items.length) {
          formValue = form.items.map((item) => item.identity);
        } else if (
          !Array.isArray(form.items) &&
          typeof form.items === 'object' &&
          form.items.identity
        ) {
          formValue = form.items.identity;
        } else if (
          typeof form.items === 'string' ||
          typeof form.items === 'number'
        ) {
          formValue = form.items;
        }
        formControls[form.name] = new FormControl(formValue, [
          ...this.getValidators(form),
        ]);
      });
    }
    this.formGroup = new FormGroup(formControls);
  }

  valueChangeEvent() {
    this.formGroupEvent.emit(this.formGroup);
  }

  getValidators(form: IFormField): any[] {
    const validators: Validators[] = [];
    if (form.required) {
      validators.push(Validators.required);
    }
    if (form.regex) {
      validators.push(Validators.pattern(form.regex));
    }
    if (form.type === 'email') {
      validators.push(Validators.email);
    }

    return validators;
  }

  get control(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  onFormSubmit() {}
}
