import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFormField } from '../Interface/IFormData';
import { KeyValuePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf, KeyValuePipe],
})
export class FormDialogComponent {
  headingText = 'Form submission Detail';
  description = 'Product Enquiry';
  constructor(@Inject(MAT_DIALOG_DATA) public fieldData: IFormField[]) {}

  getItems(data: IFormField): {
    type: string;
    value: (string | number)[] | string | number;
  } {
    if (Array.isArray(data) && data.length) {
      return {
        type: 'Array',
        value: data,
      };
    } else if (typeof data === 'string' || typeof data === 'number') {
      return {
        type: 'string',
        value: data,
      };
    } else if (typeof data === 'object') {
      return {
        type: 'string',
        value: JSON.stringify(data),
      };
    }
    return {
      type: '',
      value: '',
    };
  }
}
