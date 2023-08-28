import { Component, OnInit } from '@angular/core';
import { IFormData } from './Interface/IFormData';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { Clipboard } from '@angular/cdk/clipboard';

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
  dummyJson = DummyJson;
  supportedFormats = ['textfield', 'number', 'email', 'textarea', 'datepicker'];

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private clipboard: Clipboard
  ) {}

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

  copyToClipboard() {
    const json = JSON.stringify(this.dummyJson, null, 2);
    this.clipboard.copy(json);
  }
}

const DummyJson = [
  {
    form: 'dummy-form',
    label: 'dummy-label',
    controls: [
      {
        type: 'textfield',
        name: 'name',
        placeholder: 'enter name',
        required: true,
        regex: '',
        items: '',
      },
      {
        type: 'textarea',
        name: 'description',
        placeholder: 'enter description',
        required: true,
        regex: '',
        items: '',
      },
    ],
  },
  {
    form: 'dummy-form 2',
    label: 'dummy-label',
    controls: [
      {
        type: 'textfield',
        name: 'name',
        placeholder: 'enter name',
        required: true,
        regex: '',
        items: [
          {
            identity: '1',
            value: 'One',
          },
        ],
      },
      {
        type: 'textarea',
        name: 'description',
        placeholder: 'enter description',
        required: true,
        regex: '',
        items: '',
      },
    ],
  },
];
