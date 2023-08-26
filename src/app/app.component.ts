import { Component, OnInit } from '@angular/core';
import { IFormData } from './Interface/IFormData';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from './form-dialog/form-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'form-generator';
  formData!: IFormData[] | undefined;
  textAreaForm!: IFormData[];
  textAreaFormGroup!: FormGroup;
  formFeildGroups: FormGroup[] = [];

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.setUpTextArea();
  }

  setUpTextArea() {
    this.textAreaForm = [
      {
        form: 'TextArea',
        label: 'Generate Forms',
        submitButtonText: 'Generate',
        controls: [
          {
            type: 'textarea',
            name: 'Form Json',
            placeholder: 'Paste the Json to Generate Forms',
            required: true,
            regex: '',
            items: '',
          },
        ],
      },
    ];
  }

  setFormGroup(data: { index: number; formGroup: FormGroup }) {
    this.formFeildGroups[data.index] = data.formGroup;
  }

  openDialogBox(data: { index: number; formGroup: FormGroup }) {
    data.formGroup.markAllAsTouched();
    if (data.formGroup.invalid) {
      return;
    } else {
      this.dialog.open(FormDialogComponent, {
        data: data.formGroup.value,
      });
    }
  }

  setFormData(data: { index: number; formGroup: FormGroup }) {
    this.textAreaFormGroup = data.formGroup;
    const tempFormData = this.textAreaFormGroup.value['Form Json'];
    if (tempFormData?.length) {
      try {
        const formJson = JSON.parse(tempFormData);
        this.formData = formJson;
      } catch {
        this.formData = undefined;
        this._snackBar.open('Cannot read Json', '', {
          duration: 1000,
          panelClass: 'alert-message',
        });
      }
    } else if (!tempFormData?.length) {
      this._snackBar.open('Enter JSON to continue', '', {
        duration: 1000,
        panelClass: 'alert-message',
      });
    }
  }
}
