import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFormData } from '../Interface/IFormData';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormFieldComponent } from '../form-field/form-field.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-field-generate',
  templateUrl: './field-generate.component.html',
  styleUrls: ['./field-generate.component.scss'],
  standalone: true,
  imports: [CommonModule, MatExpansionModule, FormFieldComponent],
})
export class FieldGenerateComponent {
  @Input() formData: IFormData[] | undefined;
  @Output() formGroupEvent: EventEmitter<{
    index: number;
    formGroup: FormGroup;
  }> = new EventEmitter<{ index: number; formGroup: FormGroup }>();

  emitFormGroup(index: number, formGroup: FormGroup) {
    this.formGroupEvent.emit({ index: index, formGroup: formGroup });
  }
}
